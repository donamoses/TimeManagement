import { DayOfWeek } from "@fluentui/react";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ITimeSheetProps {
  context: WebPartContext;
  siteUrl: string;
  WebpartHeader: string;
  TaskList: string;
  EmployeeList: string;
  TimesheetList: string;

}
export interface ITimeSheetState {
  ChselectedItem?: { key: string | number | undefined };
  Task: ITask[];
  opt: any[];
  rows: Days[];
  days: Days[];
  weekday: any[];
  time: any[];
  rebind: any[];
  groupTask: any[];
  office: any[];
  selected_values: any[];
  selectedDay: any;
  bindMonday: any;
  bindtueday: any;
  bindwedday: any;
  bindthuday: any;
  bindFriday: any;
  bindsatday: any;
  bindSunday: any;
  insertMonday: any;
  insertTuesday: any;
  insertWednesday: any;
  insertThursday: any;
  insertFriday: any;
  insertSaturday: any;
  insertSunday: any;
  isEmpty: boolean;
  selectedDays: any[];
  firstDayOfWeek?: DayOfWeek;
  deptId: any;
  hoverRange: any;
  empId: any;
  weektotal: any;
  rowcount: any;
  iTask: any;
  ddid: any;
  ddTask: any;
  mon: any;
  tue: any;
  wed: any;
  thu: any;
  fri: any;
  sat: any;
  sun: any;
  copyMonday: any;
  copyTuesday: any;
  copyWednesday: any;
  copyThursday: any;
  copyFriday: any;
  copySaturday: any;
  copySunday: any;
  des: any;
  hidecreate: boolean;
  hideedit: boolean;
  hidecalendar: boolean;
  userName: any;
  employeeID: any;
  GrandTotal: any;
  SaveUpdate: any;
  userid: any;
  username: any;
  MondayTotal: any;
  TuesdayTotal: any;
  WednesdayTotal: any;
  ThursdayTotal: any;
  FridayTotal: any;
  SaturdayTotal: any;
  SundayTotal: any;
  requiredfielderror: boolean;
  timefielderror: boolean;
  savedisable: boolean;
}
export interface ITask {
  ID: any;
  Title: any;
  GID: any;
  GTask: any;
}
export interface ITime {
  ID: any;
  Task: any;
  Date: any;
  Time: any;
  TaskDescription: any;
  DayofWeek: any;
}
export interface Days {
  Sunday: any;
  Monday: any;
  Tuesday: any;
  Wednesday: any;
  Thursday: any;
  Friday: any;
  Saturday: any;
  Weektotal: any;
  Task: any;
  TaskDescription: any;
  Taskid: any;
  dpselectedDayItem?: { key: string | number | undefined | '' };
}