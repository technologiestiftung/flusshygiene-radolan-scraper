"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const promise_ftp_1 = __importDefault(require("promise-ftp"));
const scrape_path_1 = require("./lib/scrape-path");
const client = new promise_ftp_1.default();
const rootPath = '/pub/CDC/grids_germany';
const dailyRadolanFolder = `${rootPath}/daily/radolan`;
const hourlyRadolanFolder = `${rootPath}/hourly/radolan`;
const dailyHistoricalFolder = `${dailyRadolanFolder}/historical`;
const hourlyHistoricalFolder = `${hourlyRadolanFolder}/historical/bin`;
const dailyRecentFolder = `${dailyRadolanFolder}/recent`;
const hourlyRecentFolder = `${hourlyRadolanFolder}/recent/bin`;
const ftpOpts = {
    host: 'ftp-cdc.dwd.de',
};
const paths = [
    {
        folderPath: dailyHistoricalFolder,
        hasSubfolders: true,
        outFilePath: path_1.default.resolve(__dirname, '../outData/historical-daily-urls.json'),
    }, {
        folderPath: hourlyHistoricalFolder,
        hasSubfolders: true,
        outFilePath: path_1.default.resolve(__dirname, '../outData/historical-hourly-urls.json'),
    }, {
        folderPath: dailyRecentFolder,
        hasSubfolders: false,
        outFilePath: path_1.default.resolve(__dirname, '../outData/recent-daily-urls.json'),
    }, {
        folderPath: hourlyRecentFolder,
        hasSubfolders: false,
        outFilePath: path_1.default.resolve(__dirname, '../outData/recent-hourly-urls.json'),
    },
];
exports.scrapeUrls = async () => {
    try {
        await client.connect(ftpOpts); // connect to ftp
        for (const item of paths) {
            const options = {
                folderPath: item.folderPath,
                ftpclient: client,
                hasSubfolders: item.hasSubfolders,
                host: ftpOpts.host,
                outFilePath: item.outFilePath,
                rootPath,
            };
            await scrape_path_1.scrapePath(options);
        }
        await client.end();
    }
    catch (error) {
        await client.end();
        throw error;
    }
};
//# sourceMappingURL=index.js.map