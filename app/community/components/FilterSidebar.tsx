"use client";

interface FilterSidebarProps {
  activeFilter: string;
  sortBy: string;
  onFilterChange: (filter: string) => void;
  onSortChange: (sort: string) => void;
}

const filterOptions = ["전체", "리뷰", "토론", "고양이 성장 소식"];
const sortOptions = ["최신순", "인기순", "댓글순"];

export default function FilterSidebar({
  activeFilter,
  sortBy,
  onFilterChange,
  onSortChange,
}: FilterSidebarProps) {
  return (
    <div className="sticky top-40 space-y-6">
      {/* User Summary */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
        <div className="text-center">
          <div
            className="w-16 h-16 bg-gradient-accent rounded-full mx-auto mb-4 
                          flex items-center justify-center text-2xl"
          >
            😊
          </div>
          <h3 className="font-bold text-lg mb-2">영화매니아</h3>
          <div
            className="flex items-center justify-center gap-2 mb-4 
                          bg-blue-500/20 rounded-full px-3 py-1"
          >
            <span>🐱</span>
            <span className="text-sm">Lv.5 털뭉치</span>
          </div>
          <div className="space-y-2">
            <button
              className="w-full py-2 px-3 bg-white/10 hover:bg-blue-500/30 
                             rounded-lg text-sm transition-all duration-300"
            >
              내 활동 보기
            </button>
            <button
              className="w-full py-2 px-3 bg-white/10 hover:bg-blue-500/30 
                             rounded-lg text-sm transition-all duration-300"
            >
              프로필 편집
            </button>
          </div>
        </div>
      </div>

      {/* Filter Options */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
        <h3 className="text-accent-yellow font-bold mb-4">필터</h3>
        <div className="space-y-2">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={`
                w-full text-left py-2 px-3 rounded-lg text-sm transition-all duration-300
                ${
                  activeFilter === filter
                    ? "bg-blue-500/30 border border-accent-yellow text-white"
                    : "bg-white/10 hover:bg-white/15 text-gray-300"
                }
              `}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
        <h3 className="text-accent-yellow font-bold mb-4">정렬</h3>
        <div className="space-y-2">
          {sortOptions.map((sort) => (
            <button
              key={sort}
              onClick={() => onSortChange(sort)}
              className={`
                w-full text-left py-2 px-3 rounded-lg text-sm transition-all duration-300
                ${
                  sortBy === sort
                    ? "bg-blue-500/30 border border-accent-yellow text-white"
                    : "bg-white/10 hover:bg-white/15 text-gray-300"
                }
              `}
            >
              {sort}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
