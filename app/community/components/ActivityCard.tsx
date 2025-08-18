"use client";

import { useState } from "react";

export interface ActivityCardProps {
  type: "review" | "discussion" | "cat" | "emotion";
  avatar: string;
  username: string;
  timestamp: string;
  activityType: string;
  title: string;
  preview?: string;
  rating?: number;
  likes: number;
  comments: number;
  shares?: number;
  tags?: string[];
  className?: string;
}

export default function ActivityCard({
  type,
  avatar,
  username,
  timestamp,
  activityType,
  title,
  preview,
  rating,
  likes: initialLikes,
  comments,
  shares = 0,
  tags,
  className = "",
}: ActivityCardProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const getCardStyle = () => {
    switch (type) {
      case "review":
        return "border-yellow-500/30 bg-gradient-to-r from-yellow-500/5 to-red-500/5";
      case "discussion":
        return "border-blue-500/30 bg-gradient-to-r from-blue-500/5 to-cyan-500/5";
      case "cat":
        return "border-orange-500/30 bg-gradient-to-r from-orange-500/5 to-yellow-500/5";
      case "emotion":
        return "border-cyan-500/30 bg-gradient-to-r from-cyan-500/5 to-blue-500/5";
      default:
        return "border-white/10";
    }
  };

  const renderStars = () => {
    if (rating === undefined) return null;

    return (
      <div className="flex gap-1 mb-3">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={`text-lg ${
              i < rating ? "text-yellow-400" : "text-gray-600"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <article
      className={`
        bg-white/5 backdrop-blur-lg border rounded-2xl p-6 mb-6
        transition-all duration-300 hover:bg-white/8 hover:transform hover:-translate-y-1
        hover:shadow-lg hover:shadow-blue-500/10
        ${getCardStyle()} ${className}
      `}
    >
      {/* Card Header */}
      <header className="flex items-center gap-4 mb-4">
        <div
          className="w-12 h-12 bg-gradient-to-r from-pink-500 to-yellow-500 
                        rounded-full flex items-center justify-center text-lg flex-shrink-0"
        >
          {avatar}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-white truncate">{username}</h3>
          <p className="text-sm text-gray-400">{timestamp}</p>
        </div>

        <div className="bg-blue-500/20 px-3 py-1 rounded-full">
          <span className="text-xs text-accent-yellow font-medium">
            {activityType}
          </span>
        </div>
      </header>

      {/* Card Content */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-white mb-3 leading-tight">
          {title}
        </h2>

        {renderStars()}

        {preview && (
          <p className="text-gray-300 leading-relaxed text-sm line-clamp-3">
            {preview}
          </p>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-white/10 text-xs px-2 py-1 rounded-full text-gray-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Interaction Bar */}
      <footer className="flex items-center gap-4 pt-4 border-t border-white/10">
        <button
          onClick={handleLike}
          className={`
            flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-all duration-300
            ${
              isLiked
                ? "text-accent-yellow bg-yellow-500/20"
                : "text-gray-400 hover:text-accent-yellow hover:bg-yellow-500/10"
            }
          `}
        >
          <span
            className={`transition-transform duration-300 ${
              isLiked ? "scale-125" : ""
            }`}
          >
            {isLiked ? "👍" : "👍"}
          </span>
          <span>{likes}</span>
        </button>

        <button
          className="flex items-center gap-2 px-3 py-1 rounded-full text-sm 
                          text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
        >
          <span>💬</span>
          <span>{comments}</span>
        </button>

        <button
          className="flex items-center gap-2 px-3 py-1 rounded-full text-sm 
                          text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300"
        >
          <span>🔤</span>
          <span>공유</span>
        </button>

        {/* Special buttons for cat cards */}
        {type === "cat" && (
          <button
            className="flex items-center gap-2 px-3 py-1 rounded-full text-sm 
                            text-gray-400 hover:text-green-400 hover:bg-green-500/10 transition-all duration-300"
          >
            <span>🎉</span>
            <span>축하</span>
          </button>
        )}
      </footer>
    </article>
  );
}
