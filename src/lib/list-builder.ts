import ftp from 'promise-ftp';
import { IFileAttributes, IListbuilderOptions } from '../common/interfaces';

export const listBuilder:
(ftpclient: ftp , options: IListbuilderOptions) => Promise<IFileAttributes[]>
= async (ftpclient, options) => {
  try {
    const urlList: Array<{filePath: string, date: Date}> = [];
    const folders = options.folderList !== undefined ? options.folderList : [null];
    for (const folder of folders) {

      const currPath = folder !== null ? `${options.folderPath}/${folder}` : `${options.folderPath}`;
      // console.log(currPath);
      await ftpclient.cwd(currPath);
      const subList = await ftpclient.list();

      const subdirfiles = subList.map((item) => {
        if (item.type === '-') {
          return {name: item.name, date: item.date};
        }
        return null;
      });
      const filteredSubDirList = subdirfiles.filter((item) => item !== null);
      for (const fileAttribute of filteredSubDirList) {
        const filePath = `ftp://${options.host}${options.baseDir}${currPath}/${fileAttribute!.name}`;
        urlList.push({filePath, date: fileAttribute!.date});
      }
    }
    return urlList;
  } catch (error) {
    throw error;
  }
};
