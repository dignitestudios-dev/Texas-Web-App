'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface ImageCarouselModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
}

export function ImageCarouselModal({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
}: ImageCarouselModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (!isOpen || !images || images.length <= 1) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, images]);

  if (!images || images.length === 0) return null;

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[90vw] md:max-w-[800px] w-full p-0 bg-black/95 border-none rounded-2xl overflow-hidden shadow-2xl outline-none"
      >
        <div className="relative w-full h-[70vh] max-h-[600px] flex items-center justify-center select-none p-4">
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/60 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition border-none cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Current Image */}
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={images[currentIndex] || images[0]}
              alt={`Preview ${currentIndex + 1}`}
              fill
              className="object-contain"
              unoptimized
            />
          </div>

          {/* Nav Buttons (If multiple images or single image) */}
          {images.length > 1 && (
            <>
              {/* Previous Button */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/20 hover:bg-white/40 text-white backdrop-blur-md rounded-full flex items-center justify-center transition border-none cursor-pointer"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/20 hover:bg-white/40 text-white backdrop-blur-md rounded-full flex items-center justify-center transition border-none cursor-pointer"
              >
                <ChevronRight className="w-7 h-7" />
              </button>

              {/* Image Counter & Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 px-4 py-1.5 bg-black/60 backdrop-blur-md text-white font-rubik text-sm rounded-full flex items-center gap-2">
                <span>{currentIndex + 1} / {images.length}</span>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
