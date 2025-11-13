"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
// @ts-expect-error: No type declarations for '@faceio/fiojs'
import faceIO, { type FaceIO } from "@faceio/fiojs";

interface FaceIOContextType {
  faceioInstance: FaceIO | null;
  error: Error | null;
}

const FaceIOContext = createContext<FaceIOContextType>({
  faceioInstance: null,
  error: null,
});

export const FaceIOProvider = ({ children }: { children: ReactNode }) => {
  const [faceioInstance, setFaceioInstance] = useState<FaceIO | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initializeFaceIO = async () => {
      try {
        if (process.env.NEXT_PUBLIC_FACEIO_PUBLIC_KEY) {
          const instance = new faceIO(
            process.env.NEXT_PUBLIC_FACEIO_PUBLIC_KEY
          );
          setFaceioInstance(instance);
        } else {
          throw new Error("FACEIO Public Key is not configured");
        }
      } catch (err) {
        console.error("Face Recognition Initialization Failed", err);
        setError(
          err instanceof Error ? err : new Error("Initialization failed")
        );
      }
    };

    initializeFaceIO();
  }, []);

  return (
    <FaceIOContext.Provider value={{ faceioInstance, error }}>
      {children}
    </FaceIOContext.Provider>
  );
};

export const useFaceIO = () => useContext(FaceIOContext);
