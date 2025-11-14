"use client";

import { useEffect } from "react";
import { useTmaAuthMutation } from "@/entities/auth/model/api";
import { retrieveRawInitData } from "@tma.js/sdk";

export const AuthInitializer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tmaAuth] = useTmaAuthMutation();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const initData = retrieveRawInitData();
        if (!initData) {
          throw new Error("Init data not found");
        }
        await tmaAuth({ initData })
          .unwrap()
          .then((response) => {
            if (response.message === "ok") {
              localStorage.setItem("sid", response.data.sid);
            } else {
              throw new Error(response.message);
            }
          });
      } catch (error) {
        console.error("Failed to initialize auth:", error);
      }
    };

    initializeAuth();
  }, [tmaAuth]);

  return <>{children}</>;
};
