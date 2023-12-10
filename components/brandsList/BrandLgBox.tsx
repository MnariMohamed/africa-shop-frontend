import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useLanguage } from "../../hooks/useLanguage";

interface Props {
  brandName: string;
  imageSrc: string;
}
const BrandLgBox: React.FC<Props> = ({ brandName, imageSrc }) => {
  const { t } = useLanguage();

  return (
    <div className="flex items-center justify-center shadow-md bg-white h-[10rem] w-[10rem] m-0.5">
      <Image
        src={imageSrc}
        width={200}
        height={200}
        alt={brandName}
        className="object-cover hover:scale-90 transition-transform duration-300 ease-in-out !py-2 dark:invert"
      />
    </div>
  );
};

export default BrandLgBox;
