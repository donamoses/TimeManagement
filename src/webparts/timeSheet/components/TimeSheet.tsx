import * as React from 'react';
import styles from './TimeSheet.module.scss';
import { ITimeSheetProps, ITimeSheetState } from './ITimeSheetProps';
import { DefaultButton, Dropdown, IconButton, IIconProps, PrimaryButton, TextField } from '@fluentui/react';
import { DayPicker } from 'react-day-picker';
import * as moment from 'moment';
import { BaseService } from '../services';

export default class TimeSheet extends React.Component<ITimeSheetProps, ITimeSheetState, {}> {
  private _Service: BaseService;
  public constructor(props: ITimeSheetProps, state: ITimeSheetState) {
    super(props);

    this.state = {
      ChselectedItem: undefined,
      Task: [],
      opt: [],
      office: [],
      time: [],
      days: [],
      rows: [],
      weekday: [],
      rebind: [],
      groupTask: [],
      selected_values: [],
      selectedDay: '',
      isEmpty: true,
      selectedDays: [],
      bindMonday: "",
      bindtueday: "",
      bindwedday: "",
      bindthuday: "",
      bindFriday: "",
      bindsatday: "",
      bindSunday: "",
      insertMonday: "",
      insertTuesday: "",
      insertWednesday: "",
      insertThursday: "",
      insertFriday: "",
      insertSaturday: "",
      insertSunday: "",
      deptId: '',
      empId: '',
      hoverRange: '',
      weektotal: '',
      rowcount: 0,
      ddid: '',
      ddTask: '',
      iTask: '',
      mon: '',
      tue: '',
      wed: '',
      thu: '',
      fri: '',
      sat: '',
      sun: '',
      copyMonday: '',
      copyTuesday: '',
      copyWednesday: '',
      copyThursday: '',
      copyFriday: '',
      copySaturday: '',
      copySunday: '',
      des: '',
      hidecreate: false,
      hideedit: true,
      hidecalendar: true,
      userName: '',
      employeeID: '',
      GrandTotal: '0',
      SaveUpdate: '',
      userid: '',
      username: '',
      MondayTotal: '0',
      TuesdayTotal: '0',
      WednesdayTotal: '0',
      ThursdayTotal: '0',
      FridayTotal: '0',
      SaturdayTotal: '0',
      SundayTotal: '0',
      requiredfielderror: true,
      timefielderror: true,
      savedisable: false
    };
    this._Service = new BaseService(this.props.context);
    this.datepicker = this.datepicker.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.getWeekDays = this.getWeekDays.bind(this);
    this.getWeekRange = this.getWeekRange.bind(this);
    // this.handleWeekClick = this.handleWeekClick.bind(this);
    this.binddays = this.binddays.bind(this);
    this.reloaddata = this.reloaddata.bind(this);
    // this.additem = this.additem.bind(this);
    this.addrow = this.addrow.bind(this);
    this.totalChange = this.totalChange.bind(this);
    this.handleRemoveSpecificRow = this.handleRemoveSpecificRow.bind(this);
    this.dropdownChange = this.dropdownChange.bind(this);
    this.handleChange = this.handleChange.bind(this);


  }
  public datepicker = async () => {
    document.getElementById("date").style.visibility = "visible";
    this.setState({
      hidecalendar: false
    });
  }
  public handleDayClick = (date: any) => {
    document.getElementById("date").style.visibility = "hidden";
    this.setState({
      hidecalendar: true
    });

    this.setState({
      selectedDays: this.getWeekDays(this.getWeekRange(date).from),
    });
  }
  public getWeekDays(weekStart: any) {
    const days = [weekStart];
    for (let i = 1; i < 7; i += 1) {
      days.push(
        moment(weekStart)
          .add(i, 'days')
          .toDate()
      );
    }
    this.setState({
      weekday: days
    });
    this.binddays(days);
    return days;

  }
  public getWeekRange(date: any) {
    return {
      from: moment(date)
        .startOf('week')
        .toDate(),
      to: moment(date)
        .endOf('week')
        .toDate(),
    };
  }
  public binddays = (days: any[]) => {
    const Sundayy = days[0];
    const Mondayy = days[1];
    const Tuesdayy = days[2];
    const Wednesdayy = days[3];
    const Thursdayy = days[4];
    const Fridayy = days[5];
    const Saturdayy = days[6];
    const copySunday = moment(Sundayy).format('YYYY-MM-DDT12:00:00Z');
    const bindSunday = moment(Sundayy).format('DD/MM');
    const insertSunday = moment(Sundayy).format('DD/MM/YYYY');
    const copyMonday = moment(Mondayy).format('YYYY-MM-DDT12:00:00Z');
    const bindMonday = moment(Mondayy).format('DD/MM');
    const insertMonday = moment(Mondayy).format('DD/MM/YYYY');
    const copyTuesday = moment(Tuesdayy).format('YYYY-MM-DDT12:00:00Z');
    const bindtueday = moment(Tuesdayy).format('DD/MM');
    const insertTuesday = moment(Tuesdayy).format('DD/MM/YYYY');
    const copyWednesday = moment(Wednesdayy).format('YYYY-MM-DDT12:00:00Z');
    const bindwedday = moment(Wednesdayy).format('DD/MM');
    const insertWednesday = moment(Wednesdayy).format('DD/MM/YYYY');
    const copyThursday = moment(Thursdayy).format('YYYY-MM-DDT12:00:00Z');
    const bindthuday = moment(Thursdayy).format('DD/MM');
    const insertThursday = moment(Thursdayy).format('DD/MM/YYYY');
    const copyFriday = moment(Fridayy).format('YYYY-MM-DDT12:00:00Z');
    const bindFriday = moment(Fridayy).format('DD/MM');
    const insertFriday = moment(Fridayy).format('DD/MM/YYYY');
    const copySaturday = moment(Saturdayy).format('YYYY-MM-DDT12:00:00Z');
    const bindsatday = moment(Saturdayy).format('DD/MM');
    const insertSaturday = moment(Saturdayy).format('DD/MM/YYYY');

    this.setState({
      bindMonday: bindMonday,
      bindtueday: bindtueday,
      bindwedday: bindwedday,
      bindthuday: bindthuday,
      bindFriday: bindFriday,
      bindsatday: bindsatday,
      bindSunday: bindSunday,
      insertMonday: insertMonday,
      insertTuesday: insertTuesday,
      insertWednesday: insertWednesday,
      insertThursday: insertThursday,
      insertFriday: insertFriday,
      insertSaturday: insertSaturday,
      insertSunday: insertSunday,
      copyMonday: copyMonday,
      copyTuesday: copyTuesday,
      copyWednesday: copyWednesday,
      copyThursday: copyThursday,
      copyFriday: copyFriday,
      copySaturday: copySaturday,
      copySunday: copySunday
    });

    this.reloaddata();
  }
  public reloaddata = async () => {
    let DayArr: any[];
    let GroupTaskArr: any[];
    this.setState({
      rebind: []
    });
    const user = await this._Service.getCurrentUser();
    const userID = user.Id;
    const userName = user.Title;
    this.setState({
      userid: userID,
      username: userName
    });
    let Monday: any; let Tuesday: any; let Wednesday: any; let Thursday: any; let Friday: any; let Saturday: any; let Sunday: any;
    let ID: any; let Task: any; let Date: any; let Time: any; let TaskDescription: any; let DayofWeek: any; let Weektotal: any;
    let search = [];
    DayArr = [];
    GroupTaskArr = [];
    search = await this._Service.getTimeSheetItem(this.props.siteUrl, this.props.TimesheetList,
      this.state.employeeID, this.state.copySunday, this.state.copySaturday);
    search.forEach((element: any) => {
      ID = ''; Task = ''; Monday = ''; Tuesday = ''; Wednesday = ''; Thursday = ''; Friday = ''; Saturday = ''; Sunday = ''; TaskDescription = '';
      ID = element.ID; Task = element.Task; Date = element.Date; Time = element.Time; TaskDescription = element.TaskDescription;
      DayofWeek = element.DayofWeek;
      if (this.state.insertMonday === Date && DayofWeek === "1") {
        Monday = Time;
      }
      if (this.state.insertTuesday === Date && DayofWeek === "2") {
        Tuesday = Time;
      }
      if (this.state.insertWednesday === Date && DayofWeek === "3") {
        Wednesday = Time;
      }
      if (this.state.insertThursday === Date && DayofWeek === "4") {
        Thursday = Time;
      }
      if (this.state.insertFriday === Date && DayofWeek === "5") {
        Friday = Time;
      }
      if (this.state.insertSaturday === Date && DayofWeek === "6") {
        Saturday = Time;
      }
      if (this.state.insertSunday === Date && DayofWeek === "7") {
        Sunday = Time;
      }

      DayArr.push({
        ID: ID,
        Task: Task,
        Monday: Monday,
        Tuesday: Tuesday,
        Wednesday: Wednesday,
        Thursday: Thursday,
        Friday: Friday,
        Saturday: Saturday,
        Sunday: Sunday,
        TaskDescription: TaskDescription,
      });

    });
    const group = DayArr.reduce((r, a) => {

      r[a.Task] = [...r[a.Task] || [], a];
      return r;
    }, {});

    Object.keys(group).forEach((key) => {
      ID = '';
      Task = '';
      Monday = '0';
      Tuesday = '0';
      Wednesday = '0';
      Thursday = '0';
      Friday = '0';
      Saturday = '0';
      Sunday = '0';
      TaskDescription = '';
      Weektotal = 0;
      group[key].forEach((object: any) => {
        ID = object.ID;
        Task = object.Task;
        TaskDescription = object.TaskDescription;
        if (object.Monday !== "") {
          Monday = object.Monday;
        }
        if (object.Tuesday !== "") {
          Tuesday = object.Tuesday;
        }
        if (object.Wednesday !== "") {
          Wednesday = object.Wednesday;
        }
        if (object.Thursday !== "") {
          Thursday = object.Thursday;
        }
        if (object.Friday !== "") {
          Friday = object.Friday;
        }
        if (object.Saturday !== "") {
          Saturday = object.Saturday;
        }
        if (object.Sunday !== "") {

          Sunday = object.Sunday;
        }
        Weektotal = parseInt(Sunday) + parseInt(Monday) + parseInt(Tuesday) + parseInt(Wednesday) + parseInt(Thursday) + parseInt(Friday) + parseInt(Saturday);
      });
      GroupTaskArr.push({
        ID: ID,
        Task: Task,
        Monday: Monday,
        Tuesday: Tuesday,
        Wednesday: Wednesday,
        Thursday: Thursday,
        Friday: Friday,
        Saturday: Saturday,
        Sunday: Sunday,
        TaskDescription: TaskDescription,
        Weektotal: Weektotal,
        dpselectedDayItem: { key: Task }
      });
    });
    console.log(GroupTaskArr);
    this.setState({
      rows: GroupTaskArr,
      rebind: GroupTaskArr
    });
    if (this.state.rows.length === 0) {
      this.addrow();
      this.setState({
        SaveUpdate: "Save",
        hidecreate: false,
        hideedit: true
      });
    }
    else {
      this.setState({
        SaveUpdate: "Update",
        hidecreate: true,
        hideedit: false
      });
    }
    this.totalChange(0);
  }
  public addrow = () => {
    var rowcount = this.state.rowcount + 1;

    const item = {
      Sunday: 0,
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
      Weektotal: "",
      Task: "",
      TaskDescription: "",
      Taskid: ""

    };

    this.setState({
      rows: [...this.state.rows, item],
      rebind: [...this.state.rebind, item],
      rowcount: rowcount
    });
  }
  public totalChange = async (idx: number) => {
    let GrandTotal = 0;
    let MondayTotal = 0;
    let TuesdayTotal = 0;
    let WednesdayTotal = 0;
    let ThursdayTotal = 0;
    let FridayTotal = 0;
    let SaturdayTotal = 0;
    let SundayTotal = 0;
    let flag = 0;
    this.state.rows.forEach(element => {
      let Weektotal = 0;
      if (element.Monday !== "") {
        // MondayTotal= MondayTotal+parseFloat(element.Monday);
        if (MondayTotal + parseFloat(element.Monday) > 24) {
          this.state.rows[idx].Monday = 0;

          flag = 1;
        } else {
          MondayTotal = MondayTotal + parseFloat(element.Monday);
          Weektotal = Weektotal + parseFloat(element.Monday);
        }

      }
      if (element.Tuesday !== "") {
        if (TuesdayTotal + parseFloat(element.Tuesday) > 24) {
          this.state.rows[idx].Tuesday = 0;
          flag = 1;
        } else {
          TuesdayTotal = TuesdayTotal + parseFloat(element.Tuesday);
          Weektotal = Weektotal + parseFloat(element.Tuesday);
        }

      }
      if (element.Wednesday !== "") {
        if (WednesdayTotal + parseFloat(element.Wednesday) > 24) {
          this.state.rows[idx].Wednesday = "";
          flag = 1;
        } else {
          WednesdayTotal = WednesdayTotal + parseFloat(element.Wednesday);
          Weektotal = Weektotal + parseFloat(element.Wednesday);
        }

      }
      if (element.Thursday !== "") {
        if (ThursdayTotal + parseFloat(element.Thursday) > 24) {
          this.state.rows[idx].Thursday = "";
          flag = 1;
        } else {
          ThursdayTotal = ThursdayTotal + parseFloat(element.Thursday);
          Weektotal = Weektotal + parseFloat(element.Thursday);
        }
      }
      if (element.Friday !== "") {
        if (FridayTotal + parseFloat(element.Friday) > 24) {
          this.state.rows[idx].Friday = "";
          flag = 1;
        } else {
          FridayTotal = FridayTotal + parseFloat(element.Friday);
          Weektotal = Weektotal + parseFloat(element.Friday);
        }

      }
      if (element.Saturday !== "") {
        if (SaturdayTotal + parseFloat(element.Saturday) > 24) {
          this.state.rows[idx].Saturday = "";
          flag = 1;

        } else {
          SaturdayTotal = SaturdayTotal + parseFloat(element.Saturday);
          Weektotal = Weektotal + parseFloat(element.Saturday);
        }

      }
      if (element.Sunday !== "") {
        if (SundayTotal + parseFloat(element.Sunday) > 24) {
          this.state.rows[idx].Sunday = "";
          flag = 1;
        } else {
          SundayTotal = SundayTotal + parseFloat(element.Sunday);
          Weektotal = Weektotal + parseFloat(element.Sunday);
        }
      }
      element.Weektotal = Weektotal;
      console.log(element.Weektotal);
      if (element.Weektotal !== "") {

        GrandTotal = GrandTotal + element.Weektotal;
      }
      this.setState({
        GrandTotal: GrandTotal,
        MondayTotal: MondayTotal,
        TuesdayTotal: TuesdayTotal,
        WednesdayTotal: WednesdayTotal,
        ThursdayTotal: ThursdayTotal,
        FridayTotal: FridayTotal,
        SaturdayTotal: SaturdayTotal,
        SundayTotal: SundayTotal

      });

    });
    if (flag === 1) {
      alert("The time entered for a day should not be greater than 24 hours. Please, verify it and try again.");

    }
  }
  public dropdownChange(idx: any, option: { key: any; }) {
    console.log(option.key);
    let Task = option.key;
    let Taskid;
    let index;
    let temp = 0;
    this.state.opt.forEach(ddid => {
      if (Task === ddid.text.trim()) {
        Taskid = ddid.id;
        index = ddid.index;
      }
    });
    console.log(index)
    var newArray = this.state.rows;
    this.state.rows.forEach(Tasks => {
      if (Task === Tasks.Task && Task !== "") {

        temp = 1;
      }
    });
    if (temp === 1) {
      newArray[idx].Task = '';
      newArray[idx].Taskid = '';
      newArray[idx].dpselectedDayItem = {
        key: ''
      };
      alert("Task already selected . Please Select Another Task");
    }
    else {
      newArray[idx].Task = Task;
      newArray[idx].Taskid = Taskid;
      newArray[idx].dpselectedDayItem = {
        key: Task
      };
    }
    // newArray[idx] = arr;
    this.setState({
      rows: newArray,
    });

  }
  public handleChange = (idx: number) => (e: any) => {
    const { name, value } = e.target;

    const rows = [...this.state.rows];
    const item = {
      [name]: value
    };
    console.log(rows); console.log(item);
    var newArray = this.state.rows;
    var arr = newArray[idx];

    if (name === "Sunday") {
      arr.Sunday = value;
    }
    if (name === "Monday") {
      arr.Monday = value;
    }
    if (name === "Tuesday") {
      arr.Tuesday = value;
    }
    if (name === "Wednesday") {
      arr.Wednesday = value;
    }
    if (name === "Thursday") {
      arr.Thursday = value;
    }
    if (name === "Friday") {
      arr.Friday = value;
    }
    if (name === "Saturday") {
      arr.Saturday = value;
    }
    if (name === "TaskDescription") {
      arr.TaskDescription = value;
    }

    this.setState({
      rows: newArray,
    });

    let weektotal;
    let Monday;
    let Tuesday;
    let Wednesday;
    let Thursday;
    let Friday;
    let Saturday;
    let Sunday;

    if (arr.Monday === "" || arr.Monday === 0) {
      Monday = 0;
    } else {
      Monday = parseFloat(arr.Monday);
    }
    if (arr.Tuesday === "" || arr.Tuesday === "0") {
      Tuesday = 0;
    } else {
      Tuesday = parseFloat(arr.Tuesday);
    }
    if (arr.Wednesday === "" || arr.Wednesday === "0") {
      Wednesday = 0;
    } else {
      Wednesday = parseFloat(arr.Wednesday);
    }
    if (arr.Thursday === "" || arr.Thursday === "0") {
      Thursday = 0;
    } else {
      Thursday = parseFloat(arr.Thursday);
    }
    if (arr.Friday === "" || arr.Friday === "0") {
      Friday = 0;
    } else {
      Friday = parseFloat(arr.Friday);
    }
    if (arr.Saturday === "" || arr.Saturday === "0") {
      Saturday = 0;
    } else {
      Saturday = parseFloat(arr.Saturday);
    }
    if (arr.Sunday === "" || arr.Sunday === "0") {
      Sunday = 0;
    } else {
      Sunday = parseFloat(arr.Sunday);
    }
    weektotal = Sunday + Monday + Tuesday + Wednesday + Thursday + Friday + Saturday;
    arr.Sunday = Sunday; arr.Monday = Monday; arr.Tuesday = Tuesday; arr.Wednesday = Wednesday;
    arr.Thursday = Thursday; arr.Friday = Friday; arr.Saturday = Saturday; arr.Weektotal = weektotal;
    newArray[idx] = arr;
    this.setState({
      rows: newArray,

    });
    this.totalChange(idx);
  }
  public numvalid(e: any) {
    //   if (e.keyCode === 8) {
    //     console.log('delete');
    // }
  }
  public handleRemoveSpecificRow = (idx: number) => async () => {
    const rows = [...this.state.rows];
    console.log(rows);
    console.log(rows[idx].Task);
    let search = [];
    var Deleteid;
    var rowtask = rows[idx].Task;
    search = await this._Service.getTimeSheetItem(this.props.siteUrl, this.props.TimesheetList, this.state.employeeID, this.state.copySunday, this.state.copySaturday);
    console.log(search);
    if ((rows[idx].Sunday === 0 && rows[idx].Monday === 0 && rows[idx].Tuesday === 0 &&
      rows[idx].Wednesday === 0 && rows[idx].Thursday === 0 && rows[idx].Friday === 0 &&
      rows[idx].Saturday === 0) || (rows[idx].Sunday === "" && rows[idx].Monday === "" && rows[idx].Tuesday === "" &&
        rows[idx].Wednesday === "" && rows[idx].Thursday === "" && rows[idx].Friday === "" &&
        rows[idx].Saturday === "")) {
      if (confirm('Are you sure you want to delete the row?')) {
        search.forEach(async (element: any) => {
          if (rowtask === element.Task) {
            Deleteid = element.ID;
            await this._Service.deleteItem(this.props.siteUrl, this.props.TimesheetList, Deleteid);
          }
        });
        rows.splice(idx, 1);
        alert("Time sheet entry deleted.");
      }
    }
    else {
      alert("Unable to delete, the row having time details. If you want to delete please set the time as 0");
    }

    this.setState({ rows });
  }
  public additem = async () => {
    this.setState({
      requiredfielderror: true,
      timefielderror: true,
      savedisable: true
    });
    var today = new Date();
    let date = today.toLocaleString();
    var Taskid;
    var flagi = 1;
    let timeSheetList = await this._Service.getList(this.props.siteUrl, this.props.TimesheetList);
    const entityTypeFullName = timeSheetList.getListItemEntityTypeFullName();
    console.log(entityTypeFullName)
    var rowCount = 0;
    let batch = sp.web.createBatch();


    this.state.rows.forEach(async element => {
      Taskid = element.Taskid;
      if (element.Task === "" || element.TaskDescription === "") {
        flagi = 0;
        this.setState({ requiredfielderror: false });
      }
      else if (element.Monday !== "" && element.Monday < 0 || element.Tuesday !== "" && element.Tuesday < 0 ||
        element.Wednesday !== "" && element.Wednesday < 0 || element.Thursday !== "" && element.Thursday < 0 ||
        element.Friday !== "" && element.Friday < 0 || element.Saturday !== "" && element.Saturday < 0 ||
        element.Sunday !== "" && element.Sunday < 0) {
        flagi = 0;
        this.setState({ timefielderror: false });
      }

      else {
        if (element.Monday === "") {
          element.Monday = 0;
        }
        await this.upsert(timeSheetList, this.props.siteUrl, element, batch, date, Taskid, this.state.insertMonday, this.state.copyMonday, "Monday");

        if (element.Tuesday === "") { element.Tuesday = 0; }
        await this.upsert(timeSheetList, this.props.siteUrl, element, batch, date, Taskid, this.state.insertTuesday, this.state.copyTuesday, "Tuesday");

        if (element.Wednesday === "") { element.Wednesday = 0; }
        await this.upsert(timeSheetList, this.props.siteUrl, element, batch, date, Taskid, this.state.insertWednesday, this.state.copyWednesday, "Wednesday");

        if (element.Thursday === "") { element.Thursday = 0; }
        await this.upsert(timeSheetList, this.props.siteUrl, element, batch, date, Taskid, this.state.insertThursday, this.state.copyThursday, "Thursday");

        if (element.Friday === "") { element.Friday = 0; }
        await this.upsert(timeSheetList, this.props.siteUrl, element, batch, date, Taskid, this.state.insertFriday, this.state.copyFriday, "Friday");

        if (element.Saturday === "") { element.Saturday = 0; }
        await this.upsert(timeSheetList, this.props.siteUrl, element, batch, date, Taskid, this.state.insertSaturday, this.state.copySaturday, "Saturday");

        if (element.Sunday === "") { element.Sunday = 0; }
        await this.upsert(timeSheetList, this.props.siteUrl, element, batch, date, Taskid, this.state.insertSunday, this.state.copySunday, "Sunday");
      }
      rowCount++;
      if (rowCount === this.state.rows.length) {
        batch.execute().then((res: any) => {
          if (flagi != 0) {
            alert("Data Saved Successfully");

          }
          this.setState({ savedisable: false });
        });
      }
    });

  }
  private async upsert(timeSheetList: any, reqWeb: any, element: any, batch: any, date: any, Taskid: any, insertWeekDay: any, copyWeekDay: any, dayOfWeek: any) {
    const listdata = await this.getTimesheetForADay(reqWeb, element, this.getDayOfWeek(dayOfWeek), insertWeekDay);
    if (listdata.length === 0) {
      timeSheetList.items.inBatch(batch).add(this.createTimeSheetObject(element, element[dayOfWeek], date, Taskid, this.getDayOfWeek(dayOfWeek), insertWeekDay, copyWeekDay)
      );
    }
    else {
      var updateid;
      listdata.forEach(async (editid: any) => {
        updateid = editid.ID;
      });
      timeSheetList.items.inBatch(batch).getById(updateid).update({
        TaskDescription: element.TaskDescription,
        Time: element[dayOfWeek],
        UserId: this.state.userid,
        UpdatedDate: date,
      });
    }
  }
  private getTimesheetForADay(reqWeb: any, element: any, dayOfWeek: any, insertdate: any) {
    return this._Service.getTimesheetForADay(this.props.siteUrl, this.props.TimesheetList, dayOfWeek, element.Task, this.state.username, insertdate);
  }
  private createTimeSheetObject(element: any, time: any, updateddate: any, taskid: any, dayOfWeek: any, taskDate: any, copyTaskDate: any) {
    return {
      Task: element.Task,
      TaskDescription: element.TaskDescription,
      Time: time,
      DayofWeek: dayOfWeek,
      UserId: this.state.userid,
      UpdatedDate: updateddate,
      EmployeeId: this.state.empId,
      DepartmentId: this.state.deptId,
      TaskManagementId: taskid,
      Date: taskDate,
      CopyTaskDate: copyTaskDate
    };
  }
  private getDayOfWeek(day: string) {
    let daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return daysOfWeek.indexOf(day) + 1;
  }
  private Cancel = async () => {
    window.location.href = this.props.siteUrl;
  }
  public render(): React.ReactElement<ITimeSheetProps> {
    const { hoverRange, selectedDays } = this.state;
    const daysAreSelected = selectedDays.length > 0;
    const modifiers = {
      hoverRange,
      selectedRange: daysAreSelected && {
        from: selectedDays[0],
        to: selectedDays[6],
      },
      hoverRangeStart: hoverRange && hoverRange.from,
      hoverRangeEnd: hoverRange && hoverRange.to,
      selectedRangeStart: daysAreSelected && selectedDays[0],
      selectedRangeEnd: daysAreSelected && selectedDays[6],
    };
    const emojiIcon: IIconProps = { iconName: 'Cancel' };
    return (
      <section className={styles.timeSheet}>
        <div style={{ paddingBottom: '10px', paddingTop: '10px' }}>
          <h2 className='od-ItemContent-title' style={{ fontWeight: "normal" }}>{this.props.WebpartHeader}</h2>
        </div>
        <table>
          <tr>
            <td>
              <PrimaryButton text="--Select Date--" onClick={this.datepicker} />
            </td>
            <td hidden={this.state.hidecalendar}  >
              <div id="date" >
                <DayPicker
                  className={styles.daypicker}
                  selected={selectedDays}
                  showWeekNumber
                  showOutsideDays
                  modifiers={modifiers}
                  // onWeekClick={this.handleWeekClick}
                  onDayClick={this.handleDayClick} />
              </div>
            </td>
            <td><DefaultButton id="buttonadd" text="ADD ROW" onClick={this.addrow} /></td>
          </tr>
        </table>
        <div hidden={this.state.requiredfielderror} style={{ color: "red" }}>Please enter all mandatory fields</div>
        <div hidden={this.state.timefielderror} style={{ color: "red" }}>Please enter value greater than 0</div>
        <table>
          <tr>
            <th>Task<span style={{ color: "red" }}>*</span></th>
            <th> Task Description<span style={{ color: "red" }}>*</span></th>
            <th>{this.state.bindSunday}  Sun</th>
            <th>{this.state.bindMonday}  Mon</th>
            <th>{this.state.bindtueday}  Tue</th>
            <th>{this.state.bindwedday}  Wed</th>
            <th>{this.state.bindthuday}  Thu</th>
            <th>{this.state.bindFriday}  Fri</th>
            <th>{this.state.bindsatday}  Sat</th>
            <th>Total</th>
          </tr>
          <tbody id="create" >
            {this.state.rows.map((item, idx) => (
              <tr>
                <td ><Dropdown id={this.state.rowcount + "Task"}
                  placeholder="Select Task" options={this.state.opt}
                  key={idx}
                  selectedKey={item.dpselectedDayItem ? item.dpselectedDayItem.key : undefined}
                  onChanged={this.dropdownChange.bind(this, idx)}
                  style={{ width: "300px" }} /></td>
                {/* <td ><Dropdown  id={this.state.rowcount+"Task"} placeholder="Select Task" options={this.state.opt} selectedKey={item.Task}   onChange={this.dropdownChange( idx)} style={{ width: "130px" }} /></td> */}

                <td><TextField id={this.state.rowcount + "des"} name="TaskDescription" style={{ width: "300px" }} value={item.TaskDescription} onChange={this.handleChange(idx)} required ></TextField></td>
                <td><TextField type="number" id={this.state.rowcount + "sun"} name="Sunday" value={item.Sunday} style={{ width: "72px" }} onChange={this.handleChange(idx)} onKeyDown={this.numvalid}></TextField></td>
                <td><TextField type="number" id={this.state.rowcount + "mon"} name="Monday" value={item.Monday} style={{ width: "72px" }} onChange={this.handleChange(idx)}></TextField></td>
                <td><TextField type="number" id={this.state.rowcount + "tue"} name="Tuesday" value={item.Tuesday} style={{ width: "72px" }} onChange={this.handleChange(idx)}></TextField></td>
                <td><TextField type="number" id={this.state.rowcount + "wed"} name="Wednesday" value={item.Wednesday} style={{ width: "72px" }} onChange={this.handleChange(idx)}></TextField></td>
                <td><TextField type="number" id={this.state.rowcount + "thu"} name="Thursday" value={item.Thursday} style={{ width: "72px" }} onChange={this.handleChange(idx)}></TextField></td>
                <td ><TextField type="number" id={this.state.rowcount + "fri"} name="Friday" value={item.Friday} style={{ width: "72px" }} onChange={this.handleChange(idx)}></TextField></td>
                <td ><TextField type="number" id={this.state.rowcount + "sat"} name="Saturday" value={item.Saturday} style={{ width: "72px" }} onChange={this.handleChange(idx)}></TextField></td>
                <td> <TextField id={this.state.rowcount + "total"} name="total" value={item.Weektotal} style={{ width: "72px" }} disabled ></TextField></td>
                <td ><IconButton iconProps={emojiIcon} title="Cancel" ariaLabel="Cancel" onClick={this.handleRemoveSpecificRow(idx)} /></td>
              </tr>
            ))}
          </tbody>


          <tr>
            <td ></td>
            <td >TOTAL</td>
            <td ><TextField id="sun" name="sun" style={{ width: "72px" }} value={this.state.SundayTotal} disabled></TextField></td>
            <td><TextField id="mon" name="mon" style={{ width: "72px" }} value={this.state.MondayTotal} disabled></TextField></td>
            <td><TextField id="tue" name="tue" style={{ width: "72px" }} value={this.state.TuesdayTotal} disabled></TextField></td>
            <td><TextField id="wed" name="wed" style={{ width: "72px" }} value={this.state.WednesdayTotal} disabled></TextField></td>
            <td><TextField id="thu" name="thu" style={{ width: "72px" }} value={this.state.ThursdayTotal} disabled></TextField></td>
            <td><TextField id="fri" name="fri" style={{ width: "72px" }} value={this.state.FridayTotal} disabled></TextField></td>
            <td ><TextField id="sat" name="sat" style={{ width: "72px" }} value={this.state.SaturdayTotal} disabled></TextField></td>
            <td ><TextField id="total" name="total" style={{ width: "72px" }} value={this.state.GrandTotal} disabled></TextField></td>
          </tr>
          <tr>
            <td ></td>
            <td ></td>
            <td ></td>
            <td ></td>
            <td ></td>
            <td ></td>
            <td ></td>
            <td ></td>
            <td ><DefaultButton id="b1" text="SAVE" onClick={this.additem} style={{ width: "72px" }} disabled={this.state.savedisable} /></td>
            <td ><DefaultButton id="b1" text="CANCEL" onClick={this.Cancel} style={{ width: "72px" }} /></td>
          </tr>
        </table>
      </section>
    );
  }
}
