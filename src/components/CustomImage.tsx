import { getPathWithBasePath } from "@/utils/path";
import Image, { ImageProps } from "next/image";
import React from "react";

const CustomImage = (props: ImageProps) => (
  <Image
    {...props}
    src={
      typeof props.src === "string" ? getPathWithBasePath(props.src) : props.src
    }
  />
);
export default CustomImage;
