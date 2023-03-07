import { WebPartContext } from '@microsoft/sp-webpart-base';
import { HttpClient } from '@microsoft/sp-http';
import { getSP } from "../shared/PnP/pnpjsConfig";
import { SPFI } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/site-users/web";
import "@pnp/sp/site-groups";
export class BaseService {
    private _sp: SPFI;

    private currentContext: WebPartContext;
    constructor(context: WebPartContext) {
        this.currentContext = context;
        this._sp = getSP(this.currentContext);

    }

    public getLogException(Details: any) {
        console.log(Details);
    }
    public getListItems(url: string, listname: string): Promise<any> {
        return this._sp.web.getList(url + "/Lists/" + listname).items();
    }
    public getCurrentUser() {
        return this._sp.web.currentUser();
    }
    public getItemById(url: string, listname: string, id: number): Promise<any> {
        return this._sp.web.getList(url + "/Lists/" + listname).items.getById(id)();
    }
    public createNewItem(url: string, listname: string, data: any): Promise<any> {
        console.log(data);
        return this._sp.web.getList(url + "/Lists/" + listname).items.add(data);
    }
    public updateItem(url: string, listname: string, data: any, id: number): Promise<any> {
        console.log(data);
        return this._sp.web.getList(url + "/Lists/" + listname).items.getById(id).update(data);
    }

    public updateLibraryItem(url: string, libraryname: string, data: any, id: number): Promise<any> {
        console.log(data);
        return this._sp.web.getList(url + "/" + libraryname).items.getById(id).update(data);
    }
    public siteGroupMember(groupname: any): Promise<any> {
        return this._sp.web.siteGroups.getByName(groupname).users();
    }
    public getcontractIndexItemById(url: string, listname: string, id: number, fields: string, expand: string): Promise<any> {
        return this._sp.web.getList(url + "/Lists/" + listname).items.select(fields).expand(expand).filter("Id eq " + id)();
    }
    public getContractValuesListItems(url: string, listname: string): Promise<any> {
        return this._sp.web.getList(url + "/Lists/" + listname).items.select("DOA/ID,DOA/Title,DOA/EMail,Budget/ID,Budget/Budget,ID,BudgetType,RangeFrom,RangeTo").expand("DOA,Budget")();
    }
    public getEmailListItems(url: string, listname: string): Promise<any> {
        return this._sp.web.getList(url + "/Lists/" + listname).items();
    }
    public getWorkflowListItems(url: string, listname: string, id: number, fields: string, expand: string): Promise<any> {
        return this._sp.web.getList(url + "/Lists/" + listname).items.select(fields).expand(expand).filter("HeaderIDId eq " + id)();
    }
    public getAdminMembersListItems(url: string, listname: string): Promise<any> {
        return this._sp.web.getList(url + "/Lists/" + listname).items.select("Member/ID,Member/Title,Member/EMail,ID").expand("Member")();
    }
    public getMembersListItems(url: string, listname: string): Promise<any> {
        return this._sp.web.getList(url + "/Lists/" + listname).items.select("Member/ID,Member/Title,Member/EMail,ID").expand("Member")();
    }
    public deleteItem(url: string, listname: string, id: number): Promise<any> {
        return this._sp.web.getList(url + "/Lists/" + listname).items.getById(id).delete()
    }
    public _gettingUserProfiles(loginName: string): Promise<any> {
        //user profile items for manager email
        return this._sp.profiles.getUserProfilePropertyFor(loginName, "Title")
    }
    public _getUserById(id: number): Promise<any> {
        //user profile items for manager email
        return this._sp.web.getUserById(id)()
    }
    public _getGuid(List: string): Promise<any> {
        //user profile items for manager email
        return this._sp.web.lists.getByTitle(List)()
    }
    public _getLA(posturl: string, postOptions: any,): Promise<any> {
        //user profile items for manager email
        return this.currentContext.httpClient.post(posturl, HttpClient.configurations.v1, postOptions)
    }
    public getLibraryItemById(url: string, libraryname: string, id: number): Promise<any> {
        return this._sp.web.getList(url + "/" + libraryname).items.getById(id).select("FileLeafRef")();
    }
    public getLibraryLockById(url: string, libraryname: string, documentName: string): Promise<any> {
        return this._sp.web.getFolderByServerRelativePath(url + "/" + libraryname)
            .files.getByUrl(documentName).getLockedByUser();
    }
}