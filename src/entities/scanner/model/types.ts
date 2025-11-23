export interface IAuthScanner {
  device_name: string;
  password: string;
  eventId: string;
}

export interface IAuthScannerResponse {
  message: string;
  data: {
    sid: string;
  };
}
