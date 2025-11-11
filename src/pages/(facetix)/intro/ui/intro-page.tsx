import { Page } from "@/shared/ui";
import {
  ScanFace,
  ShieldCheck,
  Rocket,
  WifiOff,
  Gavel,
  CreditCard,
} from "lucide-react";
import { Text } from "@/shared/ui";

const FEATURES = [
  {
    title: "Fast & Easy",
    description: "Scan your face to enter events faster & easier",
    icon: Rocket,
  },
  {
    title: "Secure & Private",
    description: "We don't store any of your data on our servers",
    icon: ShieldCheck,
  },
  {
    title: "Offline Access",
    description: "Just show your face and you're in",
    icon: WifiOff,
  },
  {
    title: "Anti-Fraud",
    description: "Don't let fraudsters get in",
    icon: Gavel,
  },
  {
    title: "Cashless Payments",
    description: "No need to carry cash, just show your face",
    icon: CreditCard,
  },
];

export const IntroPage = () => {
  return (
    <Page className="flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl border bg-card/60 p-6 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/70 flex flex-col gap-6">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="rounded-full bg-primary/10 text-primary p-3 ring-1 ring-primary/20">
            <ScanFace className="size-10" aria-hidden="true" />
          </div>
          <Text className="text-xl font-semibold">FaceTix</Text>
          <Text className="text-muted-foreground -mt-3">
            Connect FaceID to enter events faster & easier
          </Text>
        </div>
        <div className="flex flex-col gap-4">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 text-primary p-3 ring-1 ring-primary/20">
                <feature.icon className="size-4" aria-hidden="true" />
              </div>
              <div className="flex flex-col">
                <Text>{feature.title}</Text>
                <Text className="text-sm text-muted-foreground">
                  {feature.description}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
};
