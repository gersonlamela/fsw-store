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
    <div className="flex flex-col">
      <div className="flex h-[380px] items-center justify-center bg-accent">
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
      <div className="mt-8 grid grid-cols-4 gap-4 px-5">
        {imageUrls.map((imageUrl) => (
          <button
            key={imageUrl}
            className={`flex h-[100px] items-center justify-center rounded-lg bg-accent ${
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
              className="h-auto max-h-[70%] w-auto max-w-[80%]"
              sizes="100vw"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
