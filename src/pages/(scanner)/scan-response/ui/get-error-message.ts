export const getErrorMessage = (error: unknown): string => {
  if (!error) return "We couldn't validate this pass.";

  const anyErr = error as any;
  return (
    anyErr?.data?.message ??
    anyErr?.data?.error ??
    anyErr?.message ??
    "We couldn't validate this pass. The QR code may be invalid, expired, or already used."
  );
};


