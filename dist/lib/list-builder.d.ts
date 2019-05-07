import ftp from 'promise-ftp';
import { IFileAttributes, IListbuilderOptions } from '../common/interfaces';
export declare const listBuilder: (ftpclient: ftp, options: IListbuilderOptions) => Promise<IFileAttributes[]>;
