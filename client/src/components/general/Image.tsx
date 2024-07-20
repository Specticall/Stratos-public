import { HTMLAttributes, useState } from "react";
import Skeleton from "react-loading-skeleton";

type Props = {
  skeletonHeight?: string;
  skeletonWidth?: string;
  src: string;
};

export default function Image({
  skeletonHeight,
  skeletonWidth,
  src,
  ...props
}: Props & HTMLAttributes<HTMLImageElement>) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <img {...props} src={src} onLoad={() => setIsLoading(false)} />
      {/* {isLoading && (
        <Skeleton
          height={skeletonHeight || "100%"}
          width={skeletonWidth || "100%"}
        />
      )} */}
    </>
  );
}
