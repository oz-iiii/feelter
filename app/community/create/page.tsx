"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type PostType = "review" | "discussion" | "emotion";

export default function CreatePage() {
  const router = useRouter();
  const [postType, setPostType] = useState<PostType>("review");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [movieTitle, setMovieTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [emotion, setEmotion] = useState("");
  const [emotionIntensity, setEmotionIntensity] = useState(1);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기서 실제 작성 로직을 구현
    console.log("작성 데이터:", {
      postType,
      title,
      content,
      movieTitle,
      rating,
      emotion,
      emotionIntensity,
      tags,
    });

    alert("작성이 완료되었습니다!");
    router.push("/community");
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (
      e.key === "Enter" &&
      currentTag.trim() &&
      !tags.includes(currentTag.trim())
    ) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
      e.preventDefault();
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const renderRatingStars = () => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className={`text-2xl transition-colors duration-200 ${
              star <= rating
                ? "text-yellow-400"
                : "text-gray-600 hover:text-yellow-300"
            }`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  const renderEmotionIntensity = () => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => setEmotionIntensity(level)}
            className={`w-8 h-8 rounded-full transition-colors duration-200 ${
              level <= emotionIntensity
                ? "bg-gradient-accent"
                : "bg-gray-600 hover:bg-gray-500"
            }`}
          >
            <span
              className={
                level <= emotionIntensity ? "text-black" : "text-white"
              }
            >
              {level}
            </span>
          </button>
        ))}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gradient-main pt-[130px] px-4 lg:px-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-accent bg-clip-text text-transparent mb-4">
            새 글 작성하기
          </h1>
          <p className="text-gray-400 text-lg">
            영화에 대한 생각과 감정을 자유롭게 표현해보세요
          </p>
        </div>

        {/* Post Type Selector */}
        <div className="mb-8 p-6 bg-white/5 rounded-2xl border border-white/10">
          <h3 className="text-lg font-bold text-white mb-4">
            작성할 글의 종류를 선택해주세요
          </h3>
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => setPostType("review")}
              className={`px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                postType === "review"
                  ? "bg-gradient-accent text-black"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              <span>⭐</span>
              <span>리뷰 작성</span>
            </button>
            <button
              type="button"
              onClick={() => setPostType("discussion")}
              className={`px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                postType === "discussion"
                  ? "bg-gradient-accent text-black"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              <span>💭</span>
              <span>토론 시작</span>
            </button>
            <button
              type="button"
              onClick={() => setPostType("emotion")}
              className={`px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                postType === "emotion"
                  ? "bg-gradient-accent text-black"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              <span>💙</span>
              <span>감정 기록</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Movie Title */}
          <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
            <label className="block text-lg font-bold text-white mb-3">
              {postType === "emotion" ? "영화 제목" : "영화/드라마 제목"}
            </label>
            <input
              type="text"
              value={movieTitle}
              onChange={(e) => setMovieTitle(e.target.value)}
              className="w-full p-4 bg-white/10 border border-white/20 rounded-xl 
                         text-white placeholder-gray-400 focus:outline-none 
                         focus:border-accent-yellow focus:bg-white/15"
              placeholder="영화 또는 드라마 제목을 입력하세요"
              required
            />
          </div>

          {/* Title */}
          <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
            <label className="block text-lg font-bold text-white mb-3">
              {postType === "review" && "리뷰 제목"}
              {postType === "discussion" && "토론 주제"}
              {postType === "emotion" && "감정 기록 제목"}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 bg-white/10 border border-white/20 rounded-xl 
                         text-white placeholder-gray-400 focus:outline-none 
                         focus:border-accent-yellow focus:bg-white/15"
              placeholder={
                postType === "review"
                  ? "리뷰 제목을 입력하세요"
                  : postType === "discussion"
                  ? "토론하고 싶은 주제를 입력하세요"
                  : "감정 기록의 제목을 입력하세요"
              }
              required
            />
          </div>

          {/* Rating (for reviews only) */}
          {postType === "review" && (
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <label className="block text-lg font-bold text-white mb-3">
                평점
              </label>
              <div className="flex items-center gap-4">
                {renderRatingStars()}
                <span className="text-gray-400">({rating}/5)</span>
              </div>
            </div>
          )}

          {/* Emotion Selection (for emotion posts only) */}
          {postType === "emotion" && (
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <label className="block text-lg font-bold text-white mb-3">
                느낀 감정
              </label>
              <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
                {[
                  { emoji: "😭", label: "슬픔" },
                  { emoji: "🔥", label: "흥분" },
                  { emoji: "💖", label: "따뜻함" },
                  { emoji: "😰", label: "불안" },
                  { emoji: "🥺", label: "그리움" },
                  { emoji: "😊", label: "기쁨" },
                  { emoji: "😡", label: "분노" },
                  { emoji: "😨", label: "두려움" },
                ].map((emotionOption) => (
                  <button
                    key={emotionOption.label}
                    type="button"
                    onClick={() => setEmotion(emotionOption.label)}
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      emotion === emotionOption.label
                        ? "bg-gradient-accent text-black"
                        : "bg-white/10 text-gray-300 hover:bg-white/20"
                    }`}
                  >
                    <div className="text-2xl mb-1">{emotionOption.emoji}</div>
                    <div className="text-sm">{emotionOption.label}</div>
                  </button>
                ))}
              </div>

              {emotion && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    감정 강도 ({emotionIntensity}/5)
                  </label>
                  {renderEmotionIntensity()}
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
            <label className="block text-lg font-bold text-white mb-3">
              {postType === "review" && "리뷰 내용"}
              {postType === "discussion" && "토론 내용"}
              {postType === "emotion" && "감정 기록"}
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="w-full p-4 bg-white/10 border border-white/20 rounded-xl 
                         text-white placeholder-gray-400 focus:outline-none 
                         focus:border-accent-yellow focus:bg-white/15 resize-none"
              placeholder={
                postType === "review"
                  ? "영화에 대한 솔직한 리뷰를 작성해주세요..."
                  : postType === "discussion"
                  ? "토론하고 싶은 내용을 자세히 적어주세요..."
                  : "영화를 보며 느낀 감정을 자세히 기록해주세요..."
              }
              required
            />
          </div>

          {/* Tags */}
          <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
            <label className="block text-lg font-bold text-white mb-3">
              태그
            </label>
            <input
              type="text"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyDown={handleAddTag}
              className="w-full p-4 bg-white/10 border border-white/20 rounded-xl 
                         text-white placeholder-gray-400 focus:outline-none 
                         focus:border-accent-yellow focus:bg-white/15 mb-4"
              placeholder="태그를 입력하고 Enter를 누르세요"
            />
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gradient-accent text-black px-3 py-1 rounded-full text-sm 
                               flex items-center gap-2"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:bg-black/20 rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 py-4 px-6 bg-white/10 hover:bg-white/20 rounded-xl 
                         text-white font-bold transition-all duration-300"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 py-4 px-6 bg-gradient-accent rounded-xl text-black 
                         font-bold hover:shadow-lg hover:shadow-cyan-500/20 
                         transition-all duration-300 hover:-translate-y-1"
            >
              작성 완료
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
