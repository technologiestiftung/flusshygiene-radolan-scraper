import ftp from 'promise-ftp';

export const getFolderList: (ftpclient: ftp) => Promise<Array<string | null>> = async (ftpclient) => {
  try {
    const list = await ftpclient.list(); // get the file list
    // console.log(list);
    const folderList: Array<string | null> = list.map((item) => {
      if (item.type === 'd') {
        return item.name;
      }
      return null;
    });

    const filteredFolderList = folderList.filter(item => item !== null);
    return filteredFolderList;
  } catch (error) {
    throw error;
  }
};
