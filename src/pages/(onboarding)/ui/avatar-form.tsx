"use client";

import { useFormContext } from "react-hook-form";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
  Text,
  Spinner,
} from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import { Camera } from "lucide-react";
import { useState, useEffect } from "react";
import { usePresignUrlMutation } from "@/entities/photo/model/api";
import { Button } from "@/shared/ui/button"; // shadcn UI Button

export const AvatarForm = () => {
  const { watch, setValue } = useFormContext();
  const [files, setFiles] = useState<File[]>([]);
  const [presignUrl, { isLoading: isPresignUrlLoading }] =
    usePresignUrlMutation();
  const avatarUrl = watch("avatar_url");

  useEffect(() => {
    if (avatarUrl) {
      setValue("avatar_url", avatarUrl, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [avatarUrl, setValue]);

  const handleDropzone = (files: File[]) => {
    setFiles(files);
    presignUrl({ file: files[0] })
      .unwrap()
      .then((res: any) => {
        setValue("avatar_url", res.url, {
          shouldDirty: true,
          shouldValidate: true,
        });
      });
  };

  return (
    <div className="relative inline-flex">
      <Dropzone
        accept={{ "image/*": [".png", ".jpg", ".jpeg"] }}
        onDrop={handleDropzone}
        onError={console.error}
        className={cn(
          "flex select-none mb-4! justify-center w-24! items-center h-24! bg-muted/25 cursor-pointer rounded-full p-4",
          avatarUrl && "border-none!",
        )}
        src={files}
        maxFiles={1}
      >
        <DropzoneEmptyState icon={<Camera size={16} />}>
          <Text>Avatar</Text>
        </DropzoneEmptyState>
        <DropzoneContent
          className="h-full! w-full! flex flex-col gap-2 items-center justify-center"
          icon={<Camera className="text-muted-foreground mb-2 w-6! h-6!" />}
          title="Avatar"
        >
          {avatarUrl ? null : (
            <Camera className="text-muted-foreground w-6! h-6!" />
          )}
          {avatarUrl && (
            <div className="h-full! w-full!">
              <Image
                alt="Preview"
                width={100}
                height={100}
                className={cn(
                  "absolute top-0 left-0 rounded-full h-full w-full object-cover",
                )}
                src={avatarUrl}
              />
              {isPresignUrlLoading && <Spinner className="w-4 h-4" />}
            </div>
          )}
        </DropzoneContent>
      </Dropzone>
      <div className="absolute bottom-4 right-0 z-[100]!">
        <Button
          type="button"
          size="icon"
          variant="secondary"
          className="size-7 rounded-full shadow-lg bg-background border border-border cursor-pointer hover:bg-muted transition-all"
          tabIndex={-1}
          aria-label="Change avatar"
        >
          <Camera size={16} className="text-muted-foreground" />
        </Button>
      </div>
    </div>
  );
};
