"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
  images: string[]
  alt: string
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = React.useState(images[0])

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border/50 bg-muted">
        <Image
          src={selectedImage}
          alt={alt}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className={cn(
              "relative aspect-[16/9] w-24 md:w-32 shrink-0 overflow-hidden rounded-lg border-2 transition-all",
              selectedImage === img
                ? "border-primary ring-2 ring-primary/20"
                : "border-transparent opacity-70 hover:opacity-100"
            )}
          >
            <Image
              src={img}
              alt={`${alt} thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
