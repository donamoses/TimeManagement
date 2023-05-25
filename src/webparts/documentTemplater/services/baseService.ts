import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPFI, SPFx } from "@pnp/sp";
import * as Constant from "../shared/Constant/Index";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/files";
import "@pnp/sp/folders";

export class baseService {
    private _spfi: SPFI;

    constructor(context: WebPartContext) {
        this._spfi = new SPFI(Constant.hubsiteurl).using(SPFx(context));
    }
    public async uploadFile(file: Blob, fileNamePath: string){
        return this._spfi.web.getFolderByServerRelativePath("BusinessDocuments/Preview").files.addUsingPath(fileNamePath, file, { Overwrite: true })
        .catch((error: any) => {
          console.error("Error uploading file:", error);
        });
    }
}