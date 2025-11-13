"use client";

import { useState } from "react";
import { useFaceIO } from "@/app/_providers/faceio";

export function useFaceRecognition() {
  const { faceioInstance } = useFaceIO();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const enrollUser = async (userMetadata: Record<string, unknown>) => {
    if (!faceioInstance) {
      throw new Error("FaceIO not initialized");
    }

    setIsLoading(true);
    setError(null);

    try {
      const enrollResult = await faceioInstance.enroll({
        locale: "auto",
        payload: {
          ...userMetadata,
          enrollmentTimestamp: new Date().toISOString(),
        },
      });

      setIsLoading(false);
      return {
        facialId: enrollResult.facialId,
        metadata: enrollResult,
      };
    } catch (err) {
      setIsLoading(false);
      setError(err instanceof Error ? err : new Error("Enrollment failed"));
      throw err;
    }
  };

  const authenticateUser = async () => {
    if (!faceioInstance) {
      throw new Error("FaceIO not initialized");
    }

    setIsLoading(true);
    setError(null);

    try {
      const authResult = await faceioInstance.authenticate({
        locale: "auto",
      });

      setIsLoading(false);
      return {
        facialId: authResult.facialId,
        payload: authResult.payload,
      };
    } catch (err) {
      setIsLoading(false);
      setError(err instanceof Error ? err : new Error("Authentication failed"));
      throw err;
    }
  };

  return {
    enrollUser,
    authenticateUser,
    isLoading,
    error,
  };
}
