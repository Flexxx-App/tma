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

export const ScannerLoginPage = () => {
  const [authScanner, { isLoading }] = useAuthScannerMutation();
  const router = useRouter();
  const form = useForm<IAuthScanner>({
    mode: "onChange",
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: IAuthScanner) => {
    console.log("AUTH SCANNER");
    const res = await authScanner(data)
      .then((res) => {
        router.push("/scanner");
      })
      .catch((e) => {
        console.error(e);
        router.push("/scanner");
        toast.error("Invalid password");
      });
    console.log(res);
  };

  const handleMainButtonClick = async () => await onSubmit(form.getValues());

  return (
    <Page className="flex justify-center p-4">
      <div className="w-full h-fit max-w-sm rounded-xl border bg-card/60 p-6 mt-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/70">
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
