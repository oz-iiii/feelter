"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import MyLayout from "../../components/my/MyLayout";

export default function ProfilePage() {
  const getInitialProfile = () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("userProfile");
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return {
      profileImage: "/api/placeholder/150/150",
      nickname: "영화매니아",
      email: "moviemania@feelter.com",
      bio: "영화를 사랑하는 평범한 직장인입니다. 특히 SF와 스릴러 장르를 좋아해요!",
      joinDate: "2024.01.15",
      favoriteGenres: ["SF", "스릴러", "드라마"],
      favoriteDirectors: ["크리스토퍼 놀란", "봉준호", "데니스 빌럼브"]
    };
  };

  const [profile, setProfile] = useState(getInitialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState({ ...profile });

  useEffect(() => {
    setTempProfile({ ...profile });
  }, [profile]);

  const handleSave = () => {
    setProfile({ ...tempProfile });
    if (typeof window !== "undefined") {
      localStorage.setItem("userProfile", JSON.stringify(tempProfile));
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfile({ ...profile });
    setIsEditing(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setTempProfile({ ...tempProfile, profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <MyLayout>
      <div className="w-full max-w-4xl mx-auto px-4 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">프로필 편집</h1>
          </div>
          
          <div className="flex space-x-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  저장
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                편집하기
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Image Section */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">프로필 이미지</h2>
              <div className="text-center">
                <div className="relative inline-block">
                  <Image
                    src={isEditing ? tempProfile.profileImage : profile.profileImage}
                    alt="프로필 이미지"
                    width={128}
                    height={128}
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600 mb-4"
                  />
                  {isEditing && (
                    <label className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer shadow-lg transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  가입일: {profile.joinDate}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Info Section */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">기본 정보</h2>
              
              <div className="space-y-6">
                {/* Nickname */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    닉네임
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempProfile.nickname}
                      onChange={(e) => setTempProfile({ ...tempProfile, nickname: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white py-2">{profile.nickname}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    이메일
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={tempProfile.email}
                      onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white py-2">{profile.email}</p>
                  )}
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    자기소개
                  </label>
                  {isEditing ? (
                    <textarea
                      value={tempProfile.bio}
                      onChange={(e) => setTempProfile({ ...tempProfile, bio: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white py-2">{profile.bio}</p>
                  )}
                </div>

                {/* Favorite Genres */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    선호 장르
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {profile.favoriteGenres.map((genre: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full dark:bg-blue-900 dark:text-blue-300"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Favorite Directors */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    선호 감독
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {profile.favoriteDirectors.map((director: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full dark:bg-green-900 dark:text-green-300"
                      >
                        {director}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </MyLayout>
  );
}