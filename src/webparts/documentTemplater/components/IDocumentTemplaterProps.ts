
export interface IDocumentTemplaterProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: any;
}

export interface IDocumentTemplaterState {
  arrayBuffer : ArrayBuffer;
  outputFile : Blob;
  outputFileID : string;
}