import React from "react";
import Image from "next/image";
import { ContentItem } from "@/lib/data";

interface ContentCardProps {
  content: ContentItem;
}

const ContentCard: React.FC<ContentCardProps> = ({ content }) => {
  return (
    <div className="w-full h-full bg-[#1e293b] rounded-xl overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-300">
      <div className="relative w-full h-48">
        <Image
          src={content.imageUrl}
          alt={content.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-yellow-400 font-bold text-sm bg-gray-700 rounded px-2 py-0.5">
            {content.rating}
          </span>
        </div>
        <h4 className="text-lg font-semibold text-white truncate">
          {content.title}
        </h4>
        <p className="text-sm text-[#94a3b8] mt-1">
          {content.year} | {content.genre}
        </p>
      </div>
    </div>
  );
};

export default ContentCard;