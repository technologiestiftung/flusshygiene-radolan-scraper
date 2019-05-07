import ftp from 'promise-ftp';
export declare const getFolderList: (ftpclient: ftp) => Promise<Array<string | null>>;
