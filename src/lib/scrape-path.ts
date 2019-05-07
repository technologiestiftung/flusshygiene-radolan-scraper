import fs from 'fs';
import util from 'util';
import { IFileAttributes, IListbuilderOptions, IScrapePathOptions } from '../common/interfaces';
import { getFolderList } from './get-folder-list';
import { listBuilder } from './list-builder';
const fsWriteAsync = util.promisify(fs.writeFile);

export const scrapePath: (options: IScrapePathOptions) => void = async (options) => {
  try {
    await options.ftpclient.cwd(options.folderPath); // move into historical folder
    // tslint:disable-next-line: no-unnecessary-initializer
    let folderList = undefined;
    if (options.hasSubfolders === true) {
      folderList = await getFolderList(options.ftpclient); // get a list of all folders
    }
    const listBuilderOpts: IListbuilderOptions = {
      baseDir: options.rootPath,
      folderList,
      folderPath: options.folderPath,
      host: options.host,
    };

    const urls: IFileAttributes[] = await listBuilder(options.ftpclient, listBuilderOpts);
    await fsWriteAsync(options.outFilePath,
      JSON.stringify(urls, null, 2),
    );
  } catch (error) {
    throw error;
  }
};
