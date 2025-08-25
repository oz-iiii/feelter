"use client";

import React from "react";
import ContentCard from "./ContentCard";
import Pagination from "./Pagination";
import SortDropdown from "./SortDropdown";
import { ContentItem } from "@/lib/data";

interface ContentGridProps {
  content: ContentItem[];
  currentSort: string;
  setCurrentSort: (sortKey: string) => void;
  isPaginated: boolean;
  setIsPaginated: (state: boolean) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onReset: () => void;
}

const ContentGrid: React.FC<ContentGridProps> = ({
  content,
  currentSort,
  setCurrentSort,
  isPaginated,
  setIsPaginated,
  currentPage,
  totalPages,
  onPageChange,
  onReset,
}) => {
  const handleLoadMoreClick = () => {
    if (isPaginated) {
      onReset();
    } else {
      setIsPaginated(true);
      onPageChange(1);
    }
  };

  return (
    <section className="p-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
          검색 결과 ({isPaginated ? "97" : "7"}개)
        </h2>
        <SortDropdown currentSort={currentSort} onSortChange={setCurrentSort} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
        {content.map((item, index) => (
          <ContentCard key={index} content={item} />
        ))}
      </div>
      {isPaginated && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
      <button
        className="block mx-auto mt-8 px-8 py-3 bg-transparent border border-[#ccc] text-[#ccc] rounded-full cursor-pointer hover:bg-white/10 transition-colors duration-200"
        onClick={handleLoadMoreClick}
      >
        {isPaginated ? "처음 상태로" : "더 많은 결과 보기"}
      </button>
    </section>
  );
};

export default ContentGrid;
