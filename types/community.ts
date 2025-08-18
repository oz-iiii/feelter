// src/types/community.ts

// 기본 사용자 정보
export interface User {
  id: string;
  username: string;
  nickname: string;
  avatar: string;
  level: number;
  experience: number;
  points: number;
  joinDate: string;
}

// 활동 카드 기본 인터페이스
export interface BaseActivity {
  id: string;
  userId: string;
  user: User;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  tags: string[];
}

// 리뷰 인터페이스
export interface Review extends BaseActivity {
  type: "review";
  movieId: string;
  movieTitle: string;
  rating: number;
  content: string;
  spoilerAlert: boolean;
  isRecommended: boolean;
}

// 토론 인터페이스
export interface Discussion extends BaseActivity {
  type: "discussion";
  title: string;
  content: string;
  discussionType: "general" | "question" | "poll" | "hot";
  isActive: boolean;
  views: number;
  status: "open" | "closed" | "solved";
  category: string;
}

// 감정 기록 인터페이스
export interface EmotionRecord extends BaseActivity {
  type: "emotion";
  movieId: string;
  movieTitle: string;
  emotion: string;
  emoji: string;
  intensity: number; // 1-5 scale
  content: string;
  isPrivate: boolean;
}

// 고양이 인터페이스
export interface Cat {
  id: string;
  userId: string;
  name: string;
  emoji: string;
  level: number;
  experience: number;
  maxExperience: number;
  type: string;
  specialty: string;
  description: string;
  achievements: Achievement[];
  stats: CatStats;
  createdAt: string;
  lastActiveAt: string;
}

// 고양이 통계
export interface CatStats {
  totalReviews: number;
  totalDiscussions: number;
  totalEmotions: number;
  totalLikes: number;
  avgRating: number;
}

// 업적 인터페이스
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

// 댓글 인터페이스
export interface Comment {
  id: string;
  userId: string;
  user: User;
  parentId?: string; // 대댓글의 경우
  content: string;
  likes: number;
  timestamp: string;
  isEdited: boolean;
}

// 필터 옵션
export interface FilterOptions {
  type: "all" | "review" | "discussion" | "emotion" | "cat";
  sortBy: "latest" | "popular" | "comments";
  timeRange: "all" | "today" | "week" | "month";
  category?: string;
}

// 페이지네이션
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

// API 응답 인터페이스
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: Pagination;
}

// 통계 데이터
export interface CommunityStats {
  totalUsers: number;
  totalPosts: number;
  totalReviews: number;
  totalDiscussions: number;
  totalEmotions: number;
  activeUsers: number;
  popularMovies: string[];
  trendingTopics: string[];
}

// 알림 인터페이스
export interface Notification {
  id: string;
  userId: string;
  type: "like" | "comment" | "mention" | "achievement" | "system";
  title: string;
  content: string;
  isRead: boolean;
  relatedId?: string;
  timestamp: string;
}

// 검색 결과
export interface SearchResult {
  type: "user" | "post" | "movie" | "discussion";
  id: string;
  title: string;
  subtitle?: string;
  thumbnail?: string;
  matchScore: number;
}

// 감정 타입
export type EmotionType =
  | "기쁨"
  | "슬픔"
  | "분노"
  | "두려움"
  | "놀람"
  | "혐오"
  | "사랑"
  | "흥분"
  | "평온"
  | "그리움"
  | "희망"
  | "절망"
  | "감동"
  | "재미"
  | "지루함"
  | "긴장"
  | "편안함"
  | "우울함";

// 영화/드라마 장르
export type Genre =
  | "액션"
  | "모험"
  | "코미디"
  | "드라마"
  | "판타지"
  | "SF"
  | "스릴러"
  | "공포"
  | "로맨스"
  | "미스터리"
  | "범죄"
  | "전쟁"
  | "서부"
  | "뮤지컬"
  | "애니메이션"
  | "다큐멘터리"
  | "가족"
  | "역사";

// 커뮤니티 이벤트
export interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  type: "movie_discussion" | "review_contest" | "emotion_sharing" | "special";
  startDate: string;
  endDate: string;
  isActive: boolean;
  participants: number;
  rewards: EventReward[];
}

// 이벤트 보상
export interface EventReward {
  type: "points" | "achievement" | "badge" | "item";
  value: string | number;
  description: string;
}
