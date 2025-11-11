import { Page, Text } from "@/shared/ui";
import { LoginForm } from "./form";
import { ShieldCheck } from "lucide-react";

export const ScannerLoginPage = () => {
  return (
    <Page className="flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-xl border bg-card/60 p-6 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/70">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="rounded-full bg-primary/10 text-primary p-3 ring-1 ring-primary/20">
            <ShieldCheck className="size-10" aria-hidden="true" />
          </div>
          <Text className="text-xl font-semibold">Scanner access</Text>
          <Text className="text-muted-foreground">
            Enter your organization password to continue
          </Text>
        </div>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </Page>
  );
};
