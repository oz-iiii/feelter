"use client";

import { useState } from "react";
import CommunityTabs from "./components/CommunityTabs";
import FilterSidebar from "./components/FilterSidebar";
import FeedTab from "./components/FeedTab";
import DiscussionTab from "./components/DiscussionTab";
import ReviewTab from "./components/ReviewTab";
import CatsTab from "./components/CatsTab";
import EmotionsTab from "./components/EmotionsTab";

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("feed");
  const [activeFilter, setActiveFilter] = useState("전체");
  const [sortBy, setSortBy] = useState("최신순");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "feed":
        return <FeedTab filter={activeFilter} sortBy={sortBy} />;
      case "discussion":
        return <DiscussionTab filter={activeFilter} sortBy={sortBy} />;
      case "review":
        return <ReviewTab filter={activeFilter} sortBy={sortBy} />;
      case "cats":
        return <CatsTab />;
      case "emotions":
        return <EmotionsTab />;
      default:
        return <FeedTab filter={activeFilter} sortBy={sortBy} />;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-main pt-[130px] px-4 lg:px-10">
      {/* Sub Navigation */}
      <CommunityTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 lg:gap-10 mt-8">
        {/* Left Sidebar - Hidden on mobile, shown on large screens */}
        <aside className="hidden lg:block">
          <FilterSidebar
            activeFilter={activeFilter}
            sortBy={sortBy}
            onFilterChange={setActiveFilter}
            onSortChange={setSortBy}
          />
        </aside>

        {/* Main Feed */}
        <section className="w-full max-w-4xl mx-auto lg:mx-0">
          {renderActiveTab()}
        </section>
      </div>

      {/* Mobile Filter Button - Fixed at bottom */}
      <button
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-accent rounded-full 
                   flex items-center justify-center text-black font-bold shadow-lg z-50
                   hover:shadow-xl transition-all duration-300"
        onClick={() => {
          // TODO: Open mobile filter modal
          alert("모바일 필터 모달 구현 예정");
        }}
      >
        🎛️
      </button>
    </main>
  );
}
