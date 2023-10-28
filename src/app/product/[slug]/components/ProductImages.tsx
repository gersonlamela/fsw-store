"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImageProps {
  name: string;
  imageUrls: string[];
}

export function ProductImages({ name, imageUrls }: ProductImageProps) {
  const [currentImage, setCurrentImage] = useState(imageUrls[0]);

  const handleImageClick = (imageUrl: string) => {
    setCurrentImage(imageUrl);
  };
  return (
    <div className="flex max-w-[736px] flex-col lg:flex-1 lg:flex-row-reverse lg:rounded-xl lg:bg-accent">
      <div className="flex h-[380px] w-full items-center justify-center bg-accent lg:rounded-xl">
        <Image
          src={currentImage}
          width={0}
          height={0}
          alt={name}
          className="h-auto max-h-[70%] w-auto max-w-[80%]"
          style={{
            objectFit: "contain",
          }}
          sizes="100vw"
        />
      </div>
      {/*Botões com outras Imagens*/}
      <div className="mt-8 grid grid-cols-4 gap-4 px-5 lg:mt-0 lg:flex lg:flex-col lg:py-5">
        {imageUrls.map((imageUrl) => (
          <button
            key={imageUrl}
            className={`flex h-[80px] w-[77px] items-center justify-center rounded-lg lg:bg-background ${
              imageUrl === currentImage &&
              "border-2 border-solid border-primary"
            }`}
            onClick={() => handleImageClick(imageUrl)}
          >
            <Image
              src={imageUrl}
              width={0}
              height={0}
              alt={name}
              className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
              sizes="100vw"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
