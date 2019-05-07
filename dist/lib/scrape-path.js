"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const get_folder_list_1 = require("./get-folder-list");
const list_builder_1 = require("./list-builder");
const fsWriteAsync = util_1.default.promisify(fs_1.default.writeFile);
exports.scrapePath = async (options) => {
    try {
        await options.ftpclient.cwd(options.folderPath); // move into historical folder
        // tslint:disable-next-line: no-unnecessary-initializer
        let folderList = undefined;
        if (options.hasSubfolders === true) {
            folderList = await get_folder_list_1.getFolderList(options.ftpclient); // get a list of all folders
        }
        const listBuilderOpts = {
            baseDir: options.rootPath,
            folderList,
            folderPath: options.folderPath,
            host: options.host,
        };
        const urls = await list_builder_1.listBuilder(options.ftpclient, listBuilderOpts);
        await fsWriteAsync(options.outFilePath, JSON.stringify(urls, null, 2));
    }
    catch (error) {
        throw error;
    }
};
//# sourceMappingURL=scrape-path.js.map