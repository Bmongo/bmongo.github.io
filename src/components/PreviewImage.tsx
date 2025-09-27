"use client";
import React from "react";
import Image, { type ImageProps } from "next/image";

const PreviewImage = (props: ImageProps) => {
  const handlePreview = () => {
    if (typeof props?.src === "string") {
      window.open(props?.src as string);
    }
  };

  return <Image {...props} onClick={handlePreview} />;
};

export default PreviewImage;
