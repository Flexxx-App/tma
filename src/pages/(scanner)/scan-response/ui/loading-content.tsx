import { Spinner, Text } from "@/shared/ui";

export const LoadingContent = () => (
  <div className="flex flex-col items-center gap-4 pt-2">
    <Spinner variant="ring" className="text-foreground" size={40} />
    <Text className="text-xs text-muted-foreground text-center">
      We are talking to the server to make sure this pass is valid.
    </Text>
  </div>
);


