import ftp from 'promise-ftp';

export interface IObject {
  [key: string]: any;
}
export interface IListbuilderOptions {
  host: string;
  baseDir: string;
  folderPath: string;
  folderList?: Array<string|null>;
}

export interface IFileAttributes {
  filePath: string;
  date: Date;
}

export interface IScrapePathOptions  {
  rootPath: string;
   host: string;
   ftpclient: ftp;
   folderPath: string;
   outFilePath: string;
   hasSubfolders: boolean;
}

export interface IPaths {
  folderPath: string;
  hasSubfolders: boolean;
  outFilePath: string;
}
