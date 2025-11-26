import { motion } from "motion/react";

import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/shared/ui";

type InvitationUnavailableStateProps = {
  invitationId: string | null;
  isError: boolean;
  isBeforeStart: boolean;
  isAfterEnd: boolean;
  hasRemainingUses: boolean;
};

export const InvitationUnavailableState = ({
  invitationId,
  isError,
  isBeforeStart,
  isAfterEnd,
  hasRemainingUses,
}: InvitationUnavailableStateProps) => {
  const message =
    (!invitationId && "Invitation link is missing.") ||
    (isError && "We couldn’t find this invitation.") ||
    (isBeforeStart &&
      "This invitation is not active yet. Try again later.") ||
    (isAfterEnd &&
      "This invitation has expired and can no longer be used.") ||
    (!hasRemainingUses &&
      "This invitation has already been used the maximum number of times.") ||
    "This invitation is unavailable.";

  return (
    <motion.div
      key="invalid"
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="w-full max-w-sm"
    >
      <Empty className="border bg-card">
        <EmptyHeader>
          <EmptyTitle>Invitation unavailable</EmptyTitle>
          <EmptyDescription>{message}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </motion.div>
  );
};


