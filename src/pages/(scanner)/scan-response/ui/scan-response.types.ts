export type ScanState = "idle" | "loading" | "success" | "error";

export type StatusHeaderProps = {
  state: ScanState;
  isErrorState: boolean;
};

export type ErrorContentProps = {
  message: string;
};

export type SuccessContentProps = {
  passName: string;
  guestName: string;
};
