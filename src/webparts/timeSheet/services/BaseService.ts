import { WebPartContext } from '@microsoft/sp-webpart-base';
import { getSP } from "../shared/PnP/pnpjsConfig";
import { SPFI } from "@pnp/sp";

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
    public deleteItem(url: string, listname: string, id: number): Promise<any> {
        return this._sp.web.getList(url + "/Lists/" + listname).items.getById(id).delete()
    }
    public getTimeSheetItem(url: string, listname: string, employeeID: number, copySunday: any, copySaturday: any): Promise<any> {
        return this._sp.web.getList(url + "/Lists/" + listname).getItemsByCAMLQuery({
            ViewXml: "<View><Query><Where><And><Eq><FieldRef Name='EmployeeId' /><Value Type='Text'>"
                + employeeID + "</Value></Eq><And><Geq><FieldRef Name='CopyTaskDate' /><Value Type='DateTime'>"
                + copySunday + "</Value></Geq> <Leq><FieldRef Name='CopyTaskDate' /><Value Type='DateTime' >"
                + copySaturday + "</Value></Leq></And></And></Where><GroupBy Collapse='TRUE' ><FieldRef Name='Task'/></GroupBy></Query></View>",
        })
    }
    public getList(url: string, listname: string): Promise<any> {
        return this._sp.web.getList(url + "/" + listname)()
    }
    public getTimesheetForADay(url: string, listname: string, username: any, dayOfWeek: any, Task: any, insertdate: any): Promise<any> {
        return this._sp.web.getList(url + "/Lists/" + listname).getItemsByCAMLQuery({
            ViewXml:
                "<View><Query><Where><And><And><Eq><FieldRef Name='DayofWeek' />  <Value Type='Number'>" + dayOfWeek + "</Value></Eq><Eq><FieldRef Name='Task' /> <Value Type='Text'>" + Task +
                "</Value></Eq></And><And><Eq><FieldRef Name='User' /> <Value Type='User'>" + username + "</Value></Eq><Eq><FieldRef Name='Date' /> <Value Type='Text'>" + insertdate +
                "</Value></Eq></And></And></Where></Query></View>"
        });
    }


}