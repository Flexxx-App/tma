"use client";

import { useState } from "react";
import { useFaceRecognition } from "@/shared/lib/hooks/faceRecognition";

export function FaceAuth() {
  const { enrollUser, authenticateUser, isLoading, error } =
    useFaceRecognition();
  const [userData, setUserData] = useState<Record<string, unknown> | null>(
    null
  );

  const handleEnroll = async () => {
    try {
      const result = await enrollUser({
        username: "example_user",
        email: "user@example.com",
      });
      console.log("Enrollment result", result);
      setUserData(result);
    } catch (err) {
      console.error("Enrollment error", err);
    }
  };

  const handleAuthenticate = async () => {
    try {
      const result = await authenticateUser();
      setUserData(result);
    } catch (err) {
      console.error("Authentication error", err);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {isLoading && <p>Processing...</p>}
      {error && <p>Error: {error.message}</p>}
      <button onClick={handleEnroll}>Enroll</button>
      <button onClick={handleAuthenticate}>Authenticate</button>
      {userData && <pre>{JSON.stringify(userData, null, 2)}</pre>}
    </div>
  );
}
