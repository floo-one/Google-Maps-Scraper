# Google Maps Scraper

This Google Maps Scraper is a Node.js tool that uses Puppeteer, Cheerio, and other libraries to extract business information from Google Local Services. It gathers data such as business name, address, phone number, website, rating, and more, and outputs the results in CSV format.

## Features

- **Automated Scraping**: Automatically navigates through Google Local Services, accepting cookies, clicking through business cards, and gathering relevant information.
- **Data Extraction**: Extracts essential business details such as name, address, phone number, website, and ratings.
- **CSV Export**: Outputs the scraped data in CSV format for easy analysis.
- **Dynamic Keyword Input**: Uses a text file (`keywords.txt`) to dynamically input search terms for scraping.
- **Stealth Mode**: Utilizes the Puppeteer Stealth Plugin to avoid detection by Google.

## Installation

1. Clone this repository:
    ```bash
    git clone https://github.com/floo-one/Google-Maps-Scraper.git
    cd google-maps-scraper
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `keywords.txt` file in the root directory with your search terms, one per line.

## Usage

1. Run the scraper:
    ```bash
    node app.js
    ```

2. The tool will automatically open a browser, search for each keyword in `keywords.txt`, and scrape the relevant data.

3. The results will be saved in a CSV file in the current directory.

## Use Cases

- **Lead Generation**: Collect contact information and business details for potential clients in a specific area.
- **Market Research**: Analyze competitor data by scraping business information in targeted regions.
- **Data Aggregation**: Gather data for building comprehensive business directories.
- **SEO Analysis**: Extract and evaluate business ratings and reviews for local SEO strategies.

## Requirements

- Node.js (v14 or higher)
- A stable internet connection

## Disclaimer

This tool is intended for educational purposes only. Scraping Google Maps or any other platform may violate their terms of service. Use this tool responsibly.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
