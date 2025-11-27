import { Text } from "@/shared/ui";

export const NoParamsFallback = () => (
  <div className="mt-2 flex flex-col gap-3 rounded-2xl bg-muted/60 p-3 text-xs">
    <Text className="font-medium">No scan data provided</Text>
    <Text className="text-muted-foreground leading-relaxed">
      Open the scanner, read a QR code, and you will be automatically redirected
      back to this screen with the result.
    </Text>
  </div>
);


