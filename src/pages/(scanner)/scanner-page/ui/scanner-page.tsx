"use client";

import { Page, Button, Text } from "@/shared/ui";
import { useCallback, useState } from "react";
import { qrScanner } from "@telegram-apps/sdk";

export const ScannerPage = () => {
  const [scanned, setScanned] = useState<string | undefined>(undefined);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = useCallback(async () => {
    if (!qrScanner.open.isAvailable()) {
      setScanned(undefined);
      return alert("QR Scanner is not available in this environment");
    }

    try {
      setIsScanning(true);
      const qr = await qrScanner.open({
        text: "Scan a QR code",
        capture(scannedQr) {
          // Accept the first scanned QR. Return true to capture it.
          return true;
        },
      });
      setScanned(qr);
    } finally {
      setIsScanning(false);
    }
  }, []);

  const handleClose = useCallback(() => {
    if (qrScanner.close.isAvailable()) {
      qrScanner.close();
    }
  }, []);

  return (
    <Page className="p-4 space-y-4">
      <div className="space-y-2">
        <Text className="text-xl font-semibold">QR Scanner</Text>
        <Text className="text-muted-foreground">
          Tap the button below to open the Telegram QR scanner.
        </Text>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleScan} disabled={isScanning}>
          {isScanning ? "Scanning..." : "Scan QR"}
        </Button>
        <Button variant="outline" onClick={handleClose}>
          Close scanner
        </Button>
      </div>

      {scanned !== undefined && (
        <div className="mt-4 rounded-lg border p-3">
          <Text className="font-medium">Result:</Text>
          <Text className="break-all text-muted-foreground">
            {scanned ?? ""}
          </Text>
        </div>
      )}
    </Page>
  );
};
