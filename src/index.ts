import path from 'path';
import ftp from 'promise-ftp';
import { IPaths, IScrapePathOptions } from './common/interfaces';
import { scrapePath } from './lib/scrape-path';

const client = new ftp();

const rootPath: string = '/pub/CDC/grids_germany';

const dailyRadolanFolder = `${rootPath}/daily/radolan`;
const hourlyRadolanFolder = `${rootPath}/hourly/radolan`;

const dailyHistoricalFolder = `${dailyRadolanFolder}/historical`;
const hourlyHistoricalFolder = `${hourlyRadolanFolder}/historical/bin`;

const dailyRecentFolder = `${dailyRadolanFolder}/recent`;
const hourlyRecentFolder = `${hourlyRadolanFolder}/recent/bin`;

const ftpOpts: ftp.Options = {
  host: 'ftp-cdc.dwd.de',
};

const paths: IPaths[] = [
  {
    folderPath: dailyHistoricalFolder,
    hasSubfolders: true,
    outFilePath: path.resolve(__dirname, '../outData/historical-daily-urls.json'),
  }, {
    folderPath: hourlyHistoricalFolder,
    hasSubfolders: true,
    outFilePath: path.resolve(__dirname, '../outData/historical-hourly-urls.json'),
  }, {
    folderPath: dailyRecentFolder,
    hasSubfolders: false,
    outFilePath: path.resolve(__dirname, '../outData/recent-daily-urls.json'),
  }, {
    folderPath: hourlyRecentFolder,
    hasSubfolders: false,
    outFilePath: path.resolve(__dirname, '../outData/recent-hourly-urls.json'),
  },
];

export const scrapeUrls = async () => {
  try {
    await client.connect(ftpOpts); // connect to ftp
    for (const item of paths) {
      const options: IScrapePathOptions = {
        folderPath: item.folderPath,
        ftpclient: client,
        hasSubfolders: item.hasSubfolders,
        host: ftpOpts.host!,
        outFilePath: item.outFilePath,
        rootPath,
      };
      await scrapePath(options);
    }
    await client.end();
  } catch (error) {
    await client.end();
    throw error;
  }
};
