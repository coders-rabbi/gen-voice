"use client";

import { useState } from "react";
import Image from "next/image";

interface VideoCardProps {
  id: number;
  bgColor: string;
  imgSrc: string;
  videoSrc: string;
  altText: string;
}

export default function FooterVideoGallery() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string>("");

  const cards: VideoCardProps[] = [
    {
      id: 1,
      bgColor: "bg-[#E2B2E6]",
      imgSrc:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=500",
      videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
      altText: "Car",
    },
    {
      id: 2,
      bgColor: "bg-[#F2BA1D]",
      imgSrc:
        "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&q=80&w=500",
      videoSrc: "https://www.w3schools.com/html/movie.mp4",
      altText: "Black Pug",
    },
    {
      id: 3,
      bgColor: "bg-[#35265F]",
      imgSrc:
        "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=500",
      videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
      altText: "Neon Panels",
    },
    {
      id: 4,
      bgColor: "bg-[#F8C360]",
      imgSrc:
        "https://images.unsplash.com/photo-1541248451-6028a17a3a0e?auto=format&fit=crop&q=80&w=500",
      videoSrc: "https://www.w3schools.com/html/movie.mp4",
      altText: "Hotdogs",
    },
    {
      id: 5,
      bgColor: "bg-[#55B4FF]",
      imgSrc:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=500",
      videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
      altText: "Headphones",
    },
    {
      id: 6,
      bgColor: "bg-[#CBC8CE]",
      imgSrc:
        "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=500",
      videoSrc: "https://www.w3schools.com/html/movie.mp4",
      altText: "Dancers",
    },
    {
      id: 7,
      bgColor: "bg-[#E5E4E6]",
      imgSrc:
        "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=500",
      videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
      altText: "Shih Tzu Dog",
    },
    {
      id: 8,
      bgColor: "bg-[#1F1235]",
      imgSrc:
        "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=500",
      videoSrc: "https://www.w3schools.com/html/movie.mp4",
      altText: "Cinema/Theater Neon",
    },
    {
      id: 9,
      bgColor: "bg-[#0F1115]",
      imgSrc:
        "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&q=80&w=500",
      videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
      altText: "Boxer",
    },
  ];

  const openModal = (url: string): void => {
    setVideoUrl(url);
    setIsOpen(true);
  };

  const closeModal = (): void => {
    setIsOpen(false);
    setVideoUrl("");
  };

  return (
    <div className="w-full">
      {/* ফিক্সড ৩ কলাম গ্রিড (মোবাইল এবং ডেক্সটপ সব জায়গায় ৩টি করে দেখাবে) */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => openModal(card.videoSrc)}
            className={`${card.bgColor} relative aspect-square w-full rounded-xl sm:rounded-[32px] overflow-hidden cursor-pointer flex items-center justify-center transition-transform duration-300 hover:scale-105 group shadow-sm`}
          >
            <Image
              src={card.imgSrc}
              alt={card.altText}
              fill
              unoptimized
              className="object-cover mix-blend-multiply"
            />

            {/* রেসপন্সিভ প্লে বাটন (মোবাইলে ছোট এবং ডেক্সটপে বড় দেখাবে) */}
            <div className="absolute w-[30px] h-[30px] sm:w-[30px] sm:h-[30px] bg-white/60 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors duration-300 group-hover:bg-white/90 shadow-md z-10">
              <div className="w-0 h-0 border-t-[6px] sm:border-t-[10px] border-t-transparent border-b-[6px] sm:border-b-[10px] border-b-transparent border-l-[10px] sm:border-l-[16px] border-l-gray-800 ml-0.5 sm:ml-1"></div>
            </div>
          </div>
        ))}
      </div>

      {/* ভিডিও পপ-আপ (Modal) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <button
            className="absolute top-6 right-6 text-white text-5xl font-extralight hover:text-gray-300 transition-colors"
            onClick={closeModal}
          >
            &times;
          </button>

          <div
            className="bg-black rounded-2xl overflow-hidden w-full max-w-3xl aspect-video relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={videoUrl}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
