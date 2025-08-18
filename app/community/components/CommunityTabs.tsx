"use client";

interface CommunityTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "feed", label: "피드", icon: "📱" },
  { id: "discussion", label: "토론 게시판", icon: "💭" },
  { id: "review", label: "리뷰 광장", icon: "⭐" },
  { id: "cats", label: "나의 고양이 식구들", icon: "🐱" },
  { id: "emotions", label: "나의 감정 기록실", icon: "💙" },
];

export default function CommunityTabs({
  activeTab,
  onTabChange,
}: CommunityTabsProps) {
  return (
    <nav
      className="fixed top-[70px] left-0 right-0 bg-black/90 backdrop-blur-lg 
                 border-b border-white/10 z-40 transition-transform duration-300"
    >
      <div className="flex items-center px-4 lg:px-10 py-3 overflow-x-auto">
        <div className="flex gap-4 lg:gap-10 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                relative flex items-center gap-2 px-4 py-2 text-sm lg:text-base 
                font-medium transition-all duration-300 whitespace-nowrap
                ${
                  activeTab === tab.id
                    ? "text-accent-yellow"
                    : "text-gray-400 hover:text-white"
                }
              `}
            >
              <span className="text-lg lg:hidden">{tab.icon}</span>
              <span>{tab.label}</span>

              {/* Active Tab Indicator */}
              {activeTab === tab.id && (
                <div
                  className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 
                           w-6 h-0.5 bg-gradient-accent rounded-full"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
