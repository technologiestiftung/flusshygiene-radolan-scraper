# DWD Radolan Scraper

used in the Flusshygiene project.  
Build as a module but not (yet?) published to the registry.

```bash
git clone https://github.com/technologiestiftung/flusshygiene-radolan-scraper.git ./radolan-scraper
cd radolan-scraper/
npm ci
# npm run dev
```

## Usage

```js
const {scrapeUrls} = require('./dist');
scrapeUrls();
```