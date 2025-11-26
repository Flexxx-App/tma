import { motion } from "motion/react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui";

export const InvitationLoadingState = () => {
  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="w-full max-w-sm"
    >
      <Card className="gap-4">
        <CardHeader>
          <CardTitle className="h-7 w-40 animate-pulse rounded-md bg-muted" />
          <CardDescription className="mt-1 h-4 w-56 animate-pulse rounded-md bg-muted" />
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="h-5 w-32 animate-pulse rounded-full bg-muted" />
          <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-3/4 animate-pulse rounded-md bg-muted" />
        </CardContent>
      </Card>
    </motion.div>
  );
};


