import React from "react";
import Image from "next/image";

interface Props {
  brandName: string;
  imageSrc: string;
  loading?: boolean;
}
const BrandBox: React.FC<Props> = ({ brandName, imageSrc, loading }) => {
  return (
    <div className="relative flex items-center" style={{ height: "150px" }}>
      <Image
        src={imageSrc}
        alt={brandName}
        layout="responsive"
        width={200} // Changed to make the image more rectangular
        height={150} // Adjusted to maintain the desired aspect ratio
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};

export default BrandBox;
