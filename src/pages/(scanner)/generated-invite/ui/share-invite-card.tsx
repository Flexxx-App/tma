import { Copy } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";

import { Text } from "@/shared/ui";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

type ShareInviteCardProps = {
  inviteLink: string;
  onCopyLink: () => void;
};

export const ShareInviteCard = ({
  inviteLink,
  onCopyLink,
}: ShareInviteCardProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    onCopyLink();
    setIsCopied(true);
    toast.success("Invite link copied");

    window.setTimeout(() => {
      setIsCopied(false);
    }, 500);
  };

  return (
    <Card className="rounded-2xl bg-card/80">
      <CardHeader className="gap-1 pb-3">
        <CardTitle className="text-sm font-semibold">
          Share invite link
        </CardTitle>
        <CardDescription className="text-xs">
          Copy or share the link below. Your guest will open the mini app and
          receive the selected tickets.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 pb-4">
        <div className="flex items-center gap-2 rounded-xl bg-muted/40 px-3 py-2 justify-between">
          <span
            className="truncate text-xs text-muted-foreground"
            title={inviteLink}
          >
            {inviteLink}
          </span>
          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            className="shrink-0"
            onClick={handleCopy}
          >
            <motion.div
              animate={
                isCopied
                  ? { scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }
                  : { scale: 1, rotate: 0 }
              }
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Copy className="size-4" />
            </motion.div>
          </Button>
        </div>

        <Text
          component="p"
          className="text-[11px] leading-relaxed text-muted-foreground"
        >
          Share this link only with people you want to join the event. Once a
          guest accepts the invite, they will be able to claim the selected
          tickets.
        </Text>
      </CardContent>
    </Card>
  );
};
