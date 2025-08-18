"use client";

import { useState, useEffect } from "react";

interface Discussion {
  id: string;
  type: "hot" | "discussion" | "question" | "poll";
  avatar: string;
  username: string;
  timestamp: string;
  title: string;
  preview: string;
  likes: number;
  comments: number;
  views: number;
  isActive?: boolean;
  tags: string[];
  status?: "hot" | "new" | "solved";
}

const mockDiscussionData: Discussion[] = [
  {
    id: "1",
    type: "hot",
    avatar: "🔥",
    username: "영화광",
    timestamp: "30분 전",
    title: "마블 시네마틱 유니버스는 이제 끝났을까요?",
    preview:
      "엔드게임 이후로 예전 같은 재미가 없다는 의견이 많은데, 여러분은 어떻게 생각하시나요? 새로운 페이즈에 대한 기대와 우려를 함께 이야기해봅시다...",
    likes: 45,
    comments: 23,
    views: 156,
    isActive: true,
    tags: ["마블", "MCU", "슈퍼히어로"],
    status: "hot",
  },
  {
    id: "2",
    type: "discussion",
    avatar: "💭",
    username: "드라마러버",
    timestamp: "1시간 전",
    title: "넷플릭스 vs 디즈니플러스, 어떤 플랫폼이 더 나을까요?",
    preview:
      "각 플랫폼의 장단점을 비교해보고 싶어요. 콘텐츠의 질, 가격, 사용성 등 다양한 측면에서 여러분의 경험을 들려주세요!",
    likes: 32,
    comments: 18,
    views: 89,
    tags: ["OTT", "넷플릭스", "디즈니플러스"],
    status: "new",
  },
  {
    id: "3",
    type: "question",
    avatar: "❓",
    username: "초보영화팬",
    timestamp: "2시간 전",
    title: "크리스토퍼 놀란 감독 작품 추천해주세요",
    preview:
      "인터스텔라를 보고 놀란 감독에게 빠졌어요. 다른 작품들도 보고 싶은데 어떤 순서로 보면 좋을까요? 난이도별로 추천해주시면 감사하겠습니다.",
    likes: 28,
    comments: 35,
    views: 124,
    tags: ["크리스토퍼놀란", "영화추천", "초보자"],
    status: "new",
  },
  {
    id: "4",
    type: "poll",
    avatar: "📊",
    username: "설문조사자",
    timestamp: "4시간 전",
    title: "2023년 최고의 영화는? (투표)",
    preview:
      "올해 개봉한 영화들 중에서 가장 인상 깊었던 작품을 투표로 선정해봅시다. 오펜하이머, 바비, 존윅4, 가오갤3 등 후보작들이 준비되어 있어요.",
    likes: 67,
    comments: 89,
    views: 234,
    tags: ["2023영화", "투표", "베스트"],
    status: "hot",
  },
  {
    id: "5",
    type: "discussion",
    avatar: "🎭",
    username: "장르매니아",
    timestamp: "6시간 전",
    title: "한국 스릴러 영화의 황금기가 지났을까요?",
    preview:
      "2000년대 초중반 한국 스릴러 영화들이 정말 뛰어났는데, 요즘은 예전만 못한 것 같아요. 기생충, 아가씨 같은 작품들은 있지만... 여러분 생각은?",
    likes: 41,
    comments: 27,
    views: 98,
    tags: ["한국영화", "스릴러", "영화산업"],
  },
];

interface DiscussionTabProps {
  filter: string;
  sortBy: string;
}

export default function DiscussionTab({ filter, sortBy }: DiscussionTabProps) {
  const [discussionData, setDiscussionData] =
    useState<Discussion[]>(mockDiscussionData);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    let filteredData = [...mockDiscussionData];

    // Apply type filter
    if (selectedType) {
      filteredData = filteredData.filter((item) => item.type === selectedType);
    }

    // Apply sort
    filteredData.sort((a, b) => {
      switch (sortBy) {
        case "인기순":
          return b.likes - a.likes;
        case "댓글순":
          return b.comments - a.comments;
        case "최신순":
        default:
          return 0;
      }
    });

    setDiscussionData(filteredData);
  }, [filter, sortBy, selectedType]);

  const handleCreateDiscussion = () => {
    alert("새 토론 시작 페이지로 이동합니다!");
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "hot":
        return "🔥";
      case "question":
        return "❓";
      case "poll":
        return "📊";
      default:
        return "💭";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "hot":
        return "from-red-500 to-orange-500";
      case "question":
        return "from-blue-500 to-cyan-500";
      case "poll":
        return "from-purple-500 to-pink-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getStatusBadge = (status?: string) => {
    if (!status) return null;

    const statusConfig = {
      hot: {
        text: "HOT",
        color: "bg-red-500/20 text-red-400 border-red-500/30",
      },
      new: {
        text: "NEW",
        color: "bg-green-500/20 text-green-400 border-green-500/30",
      },
      solved: {
        text: "해결",
        color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    if (!config) return null;

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}
      >
        {config.text}
      </span>
    );
  };

  const discussionTypes = [
    { id: "hot", label: "HOT 토론", icon: "🔥" },
    { id: "discussion", label: "일반 토론", icon: "💭" },
    { id: "question", label: "질문", icon: "❓" },
    { id: "poll", label: "투표", icon: "📊" },
  ];

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-accent bg-clip-text text-transparent mb-4">
          토론 게시판
        </h1>
        <p className="text-gray-400 text-lg">
          영화와 드라마에 대한 다양한 의견을 나누어보세요
        </p>
      </div>

      {/* Type Filter */}
      <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
        <h3 className="text-sm font-medium text-gray-300 mb-3">토론 유형</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedType(null)}
            className={`px-4 py-2 rounded-full text-sm transition-all duration-300 flex items-center gap-2 ${
              selectedType === null
                ? "bg-gradient-accent text-black"
                : "bg-white/10 text-gray-400 hover:text-white hover:bg-white/20"
            }`}
          >
            <span>📋</span>
            <span>전체</span>
          </button>
          {discussionTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 flex items-center gap-2 ${
                selectedType === type.id
                  ? "bg-gradient-accent text-black"
                  : `bg-gradient-to-r ${getTypeColor(
                      type.id
                    )} bg-opacity-20 text-white hover:bg-opacity-30`
              }`}
            >
              <span>{type.icon}</span>
              <span>{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Create Discussion Button */}
      <button
        onClick={handleCreateDiscussion}
        className="w-full mb-8 py-4 px-6 bg-gradient-accent rounded-xl text-black 
                   font-bold text-lg hover:shadow-lg hover:shadow-blue-500/20 
                   transition-all duration-300 hover:-translate-y-1"
      >
        새 토론 시작하기
      </button>

      {/* Discussion Cards */}
      <div className="space-y-4">
        {discussionData.map((discussion) => (
          <article
            key={discussion.id}
            className={`
              bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 
              cursor-pointer transition-all duration-300 hover:bg-white/10 
              hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10
              ${discussion.isActive ? "ring-2 ring-blue-500/30" : ""}
            `}
          >
            {/* Header */}
            <header className="flex items-center gap-4 mb-4">
              <div
                className={`
                w-12 h-12 rounded-full flex items-center justify-center text-lg
                bg-gradient-to-r ${getTypeColor(discussion.type)}
              `}
              >
                {discussion.avatar}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-white">
                    {discussion.username}
                  </h3>
                  {getStatusBadge(discussion.status)}
                  {discussion.isActive && (
                    <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-1 rounded-full text-xs font-medium">
                      활발한 토론 중
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400">{discussion.timestamp}</p>
              </div>
            </header>

            {/* Content */}
            <div className="mb-4">
              <h2 className="text-lg font-bold text-white mb-3 leading-tight">
                {discussion.title}
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm line-clamp-3 mb-3">
                {discussion.preview}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {discussion.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-white/10 text-xs px-2 py-1 rounded-full text-gray-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <footer className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>👍</span>
                  <span>{discussion.likes}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>💬</span>
                  <span>{discussion.comments}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>👥</span>
                  <span>{discussion.views}</span>
                </div>
              </div>

              {discussion.isActive && (
                <div className="flex items-center gap-2 text-sm text-blue-400">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                  <span>실시간 토론</span>
                </div>
              )}
            </footer>
          </article>
        ))}
      </div>

      {/* Hot Topics Section */}
      <div className="mt-12 mb-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          🔥 인기 토론 주제
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {discussionData
            .filter((item) => item.status === "hot")
            .slice(0, 4)
            .map((discussion) => (
              <div
                key={`hot-${discussion.id}`}
                className="bg-gradient-to-r from-red-500/10 to-orange-500/10 
                           border border-red-500/20 rounded-xl p-4 cursor-pointer
                           hover:from-red-500/15 hover:to-orange-500/15 transition-all duration-300"
              >
                <h3 className="font-bold text-white mb-2 text-sm line-clamp-2">
                  {discussion.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>💬 {discussion.comments}개 댓글</span>
                  <span>👥 {discussion.views}명 참여</span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
          <div className="text-2xl font-bold text-accent-yellow">
            {discussionData.length}
          </div>
          <div className="text-sm text-gray-400">총 토론 수</div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
          <div className="text-2xl font-bold text-red-400">
            {discussionData.filter((item) => item.status === "hot").length}
          </div>
          <div className="text-sm text-gray-400">HOT 토론</div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
          <div className="text-2xl font-bold text-blue-400">
            {discussionData.reduce((sum, item) => sum + item.comments, 0)}
          </div>
          <div className="text-sm text-gray-400">총 댓글 수</div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
          <div className="text-2xl font-bold text-green-400">
            {discussionData.filter((item) => item.isActive).length}
          </div>
          <div className="text-sm text-gray-400">활성 토론</div>
        </div>
      </div>

      {/* Discussion Guidelines */}
      <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-6 mb-8">
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          📋 토론 가이드라인
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
          <div>
            <h4 className="font-semibold text-accent-yellow mb-2">토론 예절</h4>
            <ul className="space-y-1">
              <li>• 서로 다른 의견을 존중해주세요</li>
              <li>• 근거 있는 주장을 해주세요</li>
              <li>• 스포일러는 반드시 표시해주세요</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-accent-yellow mb-2">금지사항</h4>
            <ul className="space-y-1">
              <li>• 인신공격 및 욕설 금지</li>
              <li>• 무분별한 스포일러 금지</li>
              <li>• 도배 및 광고성 글 금지</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {discussionData.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">💭</div>
          <h3 className="text-xl font-bold text-white mb-2">
            {selectedType ? "해당 유형의 토론이 없습니다" : "토론이 없습니다"}
          </h3>
          <p className="text-gray-400 mb-6">
            {selectedType ? "다른 유형을 선택하거나" : ""} 새로운 토론을
            시작해보세요.
          </p>
          <button
            onClick={handleCreateDiscussion}
            className="bg-gradient-accent px-6 py-2 rounded-lg text-black font-medium
                       hover:shadow-lg transition-all duration-300"
          >
            첫 토론 시작하기
          </button>
        </div>
      )}

      {/* Trending Topics */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          📈 실시간 트렌드
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            "#MCU페이즈5",
            "#넷플릭스오리지널",
            "#2023베스트",
            "#한국영화",
            "#놀란감독",
            "#디즈니실사화",
          ].map((trend, index) => (
            <button
              key={index}
              className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 
                         border border-purple-500/30 px-3 py-1 rounded-full 
                         text-sm text-purple-300 hover:from-purple-500/30 hover:to-pink-500/30
                         transition-all duration-300"
            >
              {trend}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
