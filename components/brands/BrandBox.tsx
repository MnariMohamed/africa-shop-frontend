import React from "react";
import Image from "next/image";

interface Props {
  brandName: string;
  imageSrc: string;
}
const BrandBox: React.FC<Props> = ({ brandName, imageSrc }) => {
  return (
    <div className="relative flex items-center p-2 lg:p-0 lg:m-1 shadow-md lg:shadow-md">
      <Image
        src={imageSrc}
        width={300}
        height={175}
        alt={brandName}
        objectFit="contain"
      />
      <div className="absolute dark:inset-0 dark:bg-slate-800/100"></div>
    </div>
  );
};

export default BrandBox;
