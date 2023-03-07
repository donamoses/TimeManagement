import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'TimeSheetWebPartStrings';
import TimeSheet from './components/TimeSheet';
import { ITimeSheetProps } from './components/ITimeSheetProps';


export default class TimeSheetWebPart extends BaseClientSideWebPart<ITimeSheetProps> {

  public render(): void {
    const element: React.ReactElement<ITimeSheetProps> = React.createElement(
      TimeSheet,
      {
        context: this.context,
        siteUrl: this.context.pageContext.web.serverRelativeUrl,
        WebpartHeader: this.properties.WebpartHeader,
        TaskList: this.properties.TaskList,
        EmployeeList: this.properties.EmployeeList,
        TimesheetList: this.properties.TimesheetList
      }
    );

    ReactDom.render(element, this.domElement);
  }








  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('WebpartHeader', {
                  label: 'WebpartHeader'
                }),
                PropertyPaneTextField('TaskList', {
                  label: 'TaskList'
                }),
                PropertyPaneTextField('EmployeeList', {
                  label: 'EmployeeList'
                }),
                PropertyPaneTextField('TimesheetList', {
                  label: 'TimesheetList'
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
