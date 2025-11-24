"use client";

import { Page, Text } from "@/shared/ui";
import { LoginForm } from "./form";
import { ShieldCheck } from "lucide-react";
import { FormProvider } from "react-hook-form";
import { useAuthScannerMutation } from "@/entities/scanner/model/api";
import { IAuthScanner } from "@/entities/scanner/model/types";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useIsClient } from "@/app/_providers/is-client-ctx";

export const ScannerLoginPage = () => {
  const [authScanner, { isLoading }] = useAuthScannerMutation();
  const router = useRouter();
  const form = useForm<IAuthScanner>({
    mode: "onChange",
    defaultValues: {
      password: "",
    },
  });
  const isClient = useIsClient();

  const eventId = useMemo<string | null>(() => {
    if (!isClient) return null;
    const tg = (window as any)?.Telegram?.WebApp;
    if (tg && tg.initDataUnsafe) {
      return tg.initDataUnsafe.start_param;
    }
    return null;
  }, [isClient]);

  const onSubmit = async ({ password, eventId, device_name }: IAuthScanner) => {
    await authScanner({
      password,
      eventId: eventId!,
      device_name: device_name,
    })
      .then(async (res) => {
        if (res.error || !res.data || !res.data.data || !res.data.data.sid) {
          toast.error("Invalid password");
        } else {
          localStorage.setItem("scanner_event_id", eventId!);
          document.cookie = `scanner_sid=${res.data.data.sid}; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax; Secure`;
          router.push("/scanner");
        }
      })
      .catch((e) => {
        console.error(e);
        toast.error("Invalid password");
      });
  };

  const handleMainButtonClick = async () =>
    await onSubmit({
      password: form.getValues().password,
      eventId: eventId!,
      device_name: form.getValues().device_name,
    });

  return (
    <Page className="flex justify-center p-4">
      <div className="w-full h-fit max-w-sm rounded-xl bg-card/60 p-6 mt-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/70">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="rounded-full bg-primary/10 text-primary p-3">
            <ShieldCheck className="size-10" aria-hidden="true" />
          </div>
          <Text className="text-xl font-semibold">Scanner access</Text>
          <Text className="text-muted-foreground">
            Enter your organization password to continue
          </Text>
        </div>
        <div className="mt-6">
          <FormProvider {...form}>
            <LoginForm />
          </FormProvider>
        </div>
      </div>
      <MainButton
        text="Login"
        onClick={handleMainButtonClick}
        progress={isLoading}
      />
    </Page>
  );
};
