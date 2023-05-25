import * as React from 'react';
import { SPHttpClient } from '@microsoft/sp-http';
import styles from './DocumentTemplater.module.scss';
import { IDocumentTemplaterProps, IDocumentTemplaterState } from './IDocumentTemplaterProps';
import * as PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { baseService } from '../services/baseService';
import { DocumentModal } from './Modal';


export default class DocumentTemplater extends React.Component<IDocumentTemplaterProps, IDocumentTemplaterState, {}> {
  private _service: any;
  public constructor(props: IDocumentTemplaterProps) {
    super(props);
    this.state = {
      arrayBuffer: null,
      outputFile: null,
      outputFileID: "",
    }
    this._service = new baseService(this.props.context);
    this.replacePlaceholder = this.replacePlaceholder.bind(this);
    this.getFile = this.getFile.bind(this);
  }
  public getFile() {
    const fileRelativeUrl = "/sites/test1512r/BusinessDocuments/Template.docx";
    const apiUrl: string = `https://4n37nt.sharepoint.com/sites/test1512r/_api/web/getfilebyserverrelativeurl('${encodeURIComponent(fileRelativeUrl)}')/$value`;
    this.props.context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1)
      .then((response: any) => {
        if (response.ok) {
          return response.arrayBuffer();
        } else {
          throw new Error("File retrieval failed.");
        }
      })
      .then((arrayBuffer: ArrayBuffer) => {
        this.setState({ arrayBuffer });
        this.replacePlaceholder();
      })
      .catch((error: Error) => {
        console.error(error);
      });
  }

  public insertToLibrary() {
    // Save the document to SharePoint library
    const fileName = "preview.docx"; // file name in folder
    const fileContent = this.state.outputFile;
    this._service.uploadFile(fileContent, fileName)
      .then((response: any) => {
        console.log("Insert to Library", response);
        this.setState({ outputFileID: response.data.UniqueId })
      })
  }

  public downloadFile(file: Blob) {
    try {
      // Create a temporary link element
      const downloadLink = document.createElement("a");
      // Set the link's href and download attributes
      downloadLink.href = URL.createObjectURL(file);
      downloadLink.download = "Output.docx";
      // Simulate a click on the link to trigger the download
      downloadLink.click();
    } catch (error) {
      console.error(error);
    }
  }

  public replacePlaceholder() {
    const zip = new PizZip(this.state.arrayBuffer);
    const doc = new Docxtemplater(zip, {});
    doc.render({
      purpose: "RESIDENCE",
      docID: "543",
      author: "Dona",
      owner: "Rafad",
      coauthor: "Ahmad"
    });
    const outputFile = doc.getZip().generate({
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    this.setState({ outputFile });
    this.insertToLibrary();
  }

  public render(): React.ReactElement<IDocumentTemplaterProps> {
    const {
    } = this.props;
    
    return (
      <section className={styles.documentTemplater}>
        <h1>POC- Document Generator</h1>
        <button onClick={this.getFile}>Generate Document</button>
        {this.state.outputFileID !== "" && (
        <DocumentModal docId={this.state.outputFileID}/>)}
      </section>
    );
  }
}




