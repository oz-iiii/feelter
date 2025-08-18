"use client";

import { useState } from "react";
import Image from "next/image";
import MyLayout from "../../components/my/MyLayout";

export default function HistoryPage() {
  const [watchHistory] = useState([
    { 
      id: 1, 
      title: "인터스텔라", 
      poster: "/among-us-poster.png", 
      watchDate: "2024.08.10", 
      rating: 4.5, 
      genre: "SF/드라마", 
      director: "크리스토퍼 놀란",
      duration: "169분"
    },
    { 
      id: 2, 
      title: "기생충", 
      poster: "/among-us-poster.png", 
      watchDate: "2024.08.08", 
      rating: 5.0, 
      genre: "드라마/스릴러", 
      director: "봉준호",
      duration: "132분"
    },
    { 
      id: 3, 
      title: "타이타닉", 
      poster: "/among-us-poster.png", 
      watchDate: "2024.08.05", 
      rating: 4.0, 
      genre: "로맨스/드라마", 
      director: "제임스 카메론",
      duration: "194분"
    },
    { 
      id: 4, 
      title: "어벤져스: 엔드게임", 
      poster: "/among-us-poster.png", 
      watchDate: "2024.08.03", 
      rating: 4.8, 
      genre: "액션/어드벤처", 
      director: "안토니 루소",
      duration: "181분"
    },
    { 
      id: 5, 
      title: "라라랜드", 
      poster: "/among-us-poster.png", 
      watchDate: "2024.08.01", 
      rating: 4.2, 
      genre: "뮤지컬/로맨스", 
      director: "데미언 차젤",
      duration: "128분"
    }
  ]);

  const [filter, setFilter] = useState("all");

  const filteredHistory = watchHistory.filter(movie => {
    if (filter === "all") return true;
    if (filter === "recent") return new Date(movie.watchDate) > new Date("2024.08.05");
    if (filter === "high-rated") return movie.rating >= 4.5;
    return true;
  });

  return (
    <MyLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">시청 이력</h1>
          </div>
          
          {/* Filter Options */}
          <div className="flex space-x-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">전체</option>
              <option value="recent">최근 시청</option>
              <option value="high-rated">높은 평점</option>
            </select>
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
              전체 삭제
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">총 시청 영화</h3>
            <p className="text-3xl font-bold text-blue-600">{watchHistory.length}편</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">평균 평점</h3>
            <p className="text-3xl font-bold text-yellow-500">
              {(watchHistory.reduce((sum, movie) => sum + movie.rating, 0) / watchHistory.length).toFixed(1)}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">이번 달 시청</h3>
            <p className="text-3xl font-bold text-green-600">{watchHistory.length}편</p>
          </div>
        </div>

        {/* Movie List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              시청 목록 ({filteredHistory.length}편)
            </h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredHistory.map((movie) => (
              <div key={movie.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-start space-x-4">
                  {/* Movie Poster */}
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    width={96}
                    height={144}
                    className="w-24 h-36 object-cover rounded-lg shadow-sm"
                  />
                  
                  {/* Movie Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          {movie.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-1">
                          감독: {movie.director} • {movie.duration}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                          장르: {movie.genre}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                          시청일: {movie.watchDate}
                        </p>
                      </div>
                      
                      {/* Rating and Actions */}
                      <div className="text-right">
                        <div className="flex items-center mb-3">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${
                                i < movie.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                            {movie.rating}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors">
                            다시 보기
                          </button>
                          <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            삭제
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MyLayout>
  );
}