const puppeteer = require('puppeteer-extra');
const cheerio = require('cheerio');
const converter = require('json-2-csv');
const fs = require("node:fs");

const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

(async () => {
    console.clear();
    console.log(`Google Maps Scraper\n------------------------`);

    // Pfad zur Textdatei mit den Suchbegriffen
    const filePath = 'keywords.txt';

    // Lese die Suchbegriffe aus der Textdatei
    const searchStrings = fs.readFileSync(filePath, 'utf-8').split('\n').map(line => line.trim());

    const browser = await puppeteer.launch({ headless: false });

    for (const searchString of searchStrings) {
        console.log(`Scraping für Suchbegriff: ${searchString}`);

        const page = await browser.newPage();
        const start_time = new Date();

        await page.goto(`https://www.google.com/localservices/prolist?hl=en-GB&gl=uk&ssta=1&q=${encodeURIComponent(searchString)}&oq=${encodeURIComponent(searchString)}&src=2`);

        const acceptAllButton = await page.$('button[aria-label="Accept all"]');
        if (acceptAllButton) {
            await acceptAllButton.click();
        }

        await page.waitForTimeout(3000);

        let scrapeData = [];
        const getPageData = async () => {
            let cards = await page.evaluate(async () => {
                const organicCards = Array.from(document.querySelectorAll('div[data-test-id="organic-list-card"]'));

                let cardData = [];
                for (const card of organicCards) {
                    try {
                        await card.querySelector('div[role="button"] > div:first-of-type').click();
                        await new Promise(resolve => setTimeout(() => resolve(), 1000));

                        const name = document.querySelector(".tZPcob") ? document.querySelector(".tZPcob").innerText : "NONE";
                        const phoneNumber = document.querySelector('[data-phone-number][role="button"][class*=" "]') ? document.querySelector('[data-phone-number][role="button"][class*=" "]').querySelector("div:last-of-type").innerHTML : "NONE";
                        const website = document.querySelector(".iPF7ob > div:last-of-type") ? document.querySelector(".iPF7ob > div:last-of-type").innerHTML : "NONE";
                        const address = document.querySelector(".fccl3c") ? document.querySelector(".fccl3c").innerText : "NONE";
                        const rating = document.querySelector(".pNFZHb .rGaJuf").innerHTML ? document.querySelector(".pNFZHb .rGaJuf").innerHTML : "NONE";
                        const ratingNumber = document.querySelector(".QwSaG .leIgTe").innerHTML.replace(/\(|\)/g, "");
                        cardData.push({
                            name,
                            address,
                            phone: phoneNumber == "NONE" ? phoneNumber : phoneNumber,
                            website,
                            rating,
                            ratingNumber
                        });
                    } catch (e) {
                        console.log(e);
                    }
                }

                return cardData;
            });

            cards = await Promise.all(await cards.map(async c => {
                if (c.website == "NONE" || !c.website) return c;

                try {
                    let websiteURL = c.website.includes("http") ? c.website : `https://${c.website}`;

                    const websiteContent = await fetch(websiteURL);
                    const websiteHTML = await websiteContent.text();
                    const copyrightYears = extractCopyrightYear(websiteHTML);

                    c.copyright_year = copyrightYears.length > 0 ? copyrightYears[0] : null;
                    return c;
                } catch (e) {
                    c.copyright_year = null;
                    return c;
                }
            }));
            console.log(`[data] Succesfully scraped ${cards.length} records, continuing to the next page if it's available`);

            scrapeData = scrapeData.concat(cards);

            const nextButton = await page.$('button[aria-label="Next"]');
            if (nextButton) {
                try {
                    await nextButton.click();
                    await page.waitForTimeout(5000);
                    await getPageData();
                } catch (e) {
                    const csv = await converter.json2csv(scrapeData);
                    fs.writeFileSync(`output-${searchString}-${(Math.random() + 1).toString(36).substring(7)}.csv`, csv, "utf-8");

                    console.log(`[+] Records saved to CSV file`);
                    console.log(`[success] Scraped ${scrapeData.length} records in ${(Date.now() - start_time.getTime()) / 1000}s`);
                }
            } else {
                const csv = await converter.json2csv(scrapeData);
                fs.writeFileSync(`output-${searchString}-${(Math.random() + 1).toString(36).substring(7)}.csv`, csv, "utf-8");

                console.log(`[+] Records saved to CSV file`);
                console.log(`[success] Scraped ${scrapeData.length} records in ${(Date.now() - start_time.getTime()) / 1000}s`);
            }
        };

        await getPageData();

        await page.close();
    }

    await browser.close();
})();

function extractCopyrightYear(html) {
    const $ = cheerio.load(html);

    const copyrightDivs = $('div').filter((index, element) => {
        const divText = $(element).text();
        return /Copyright|©/.test(divText);
    });

    const copyrightYears = [];
    copyrightDivs.each((index, element) => {
        const divText = $(element).text();
        if (divText.length > 400) return;
        if (!divText.toLowerCase().includes("copyright") && !divText.toLowerCase().includes("©")) return;
        const years = divText.match(/\b\d{4}\b/g);
        if (years) {
            years.forEach((year) => {
                const yearInt = parseInt(year);
                if (!isNaN(yearInt)) {
                    copyrightYears.push(yearInt);
                }
            });
        }
    });

    return copyrightYears;
}
