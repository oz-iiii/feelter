"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CommunityTabs from "./components/CommunityTabs";
import FeedTab from "./components/FeedTab";
import DiscussionTab from "./components/DiscussionTab";
import ReviewTab from "./components/ReviewTab";
import CatsTab from "./components/CatsTab";
import EmotionsTab from "./components/EmotionsTab";

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("feed");
  const router = useRouter();

  const handleCreatePost = () => {
    router.push("/community/create");
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "feed":
        return <FeedTab onCreatePost={handleCreatePost} />;
      case "discussion":
        return <DiscussionTab onCreatePost={handleCreatePost} />;
      case "review":
        return <ReviewTab onCreatePost={handleCreatePost} />;
      case "cats":
        return <CatsTab />;
      case "emotions":
        return <EmotionsTab onCreatePost={handleCreatePost} />;
      default:
        return <FeedTab onCreatePost={handleCreatePost} />;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-main pt-[130px] px-4 lg:px-10">
      {/* Sub Navigation */}
      <CommunityTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content - 전체 너비로 변경 */}
      <div className="max-w-5xl mx-auto mt-8">{renderActiveTab()}</div>
    </main>
  );
}
