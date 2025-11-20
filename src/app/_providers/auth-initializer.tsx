"use client";

import { useEffect } from "react";
import { useTmaAuthMutation } from "@/entities/auth/model/api";
import { retrieveLaunchParams, retrieveRawInitData } from "@tma.js/sdk";
import { useRouter } from "next/navigation";

function setCookie(
  name: string,
  value: string,
  options: { path?: string; sameSite?: string } = {},
) {
  let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  if (options.path) {
    cookieStr += `; path=${options.path}`;
  }
  if (options.sameSite) {
    cookieStr += `; SameSite=${options.sameSite}`;
  }
  // This works on the client; on the server, you need headers
  window?.document && (window.document.cookie = cookieStr);
}

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
              setCookie("sid", response.data.sid, {
                path: "/",
                sameSite: "Lax",
              });
            }
          })
          .catch((error) => {
            console.error("Failed to initialize auth:", error);
          });
      } catch (error) {
        console.error("Failed to initialize auth:", error);
      }
    };

    initializeAuth();
  }, [tmaAuth]);

  return <>{children}</>;
};
