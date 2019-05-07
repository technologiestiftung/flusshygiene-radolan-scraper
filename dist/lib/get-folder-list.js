"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFolderList = async (ftpclient) => {
    try {
        const list = await ftpclient.list(); // get the file list
        // console.log(list);
        const folderList = list.map((item) => {
            if (item.type === 'd') {
                return item.name;
            }
            return null;
        });
        const filteredFolderList = folderList.filter(item => item !== null);
        return filteredFolderList;
    }
    catch (error) {
        throw error;
    }
};
//# sourceMappingURL=get-folder-list.js.map