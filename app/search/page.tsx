"use client";

import React, { useState, useEffect, useCallback } from "react";
import Header from "./header";
import SearchBar from "./SearchBar";
import ContentGrid from "./ContentGrid";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import SearchModal from "./SearchModal";
import { sampleContent, ContentItem, MASTER_DATA } from "@/lib/data";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState("latest");
  const [isPaginated, setIsPaginated] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Mock large dataset
  const buildLargeDataset = (times: number = 10): ContentItem[] => {
    const arr: ContentItem[] = [];
    for (let i = 0; i < times; i += 1) {
      arr.push(
        ...sampleContent.map((x, idx) => ({
          ...x,
          title: `${x.title} ${i + 1}-${idx + 1}`,
        }))
      );
    }
    return arr;
  };

  const [largeDataset, setLargeDataset] = useState<ContentItem[]>(() =>
    buildLargeDataset(8)
  );

  const sortDataset = useCallback(
    (dataset: ContentItem[], sortKey: string): ContentItem[] => {
      function getSortValue(item: ContentItem) {
        switch (sortKey) {
          case "latest":
            return item.year || 0;
          case "popular":
            return item.popularity || 0;
          case "rating":
            return item.rating || 8.0;
          case "title":
            return item.title || "";
          default:
            return 0;
        }
      }

      return [...dataset].sort((a, b) => {
        if (sortKey === "title") {
          return String(getSortValue(a)).localeCompare(String(getSortValue(b)));
        }
        return Number(getSortValue(b)) - Number(getSortValue(a));
      });
    },
    []
  );

  useEffect(() => {
    setLargeDataset((prevDataset) => sortDataset(prevDataset, currentSort));
  }, [currentSort, sortDataset]);

  const currentContent = isPaginated
    ? largeDataset.slice(
        (currentPage - 1) * pageSize,
        (currentPage - 1) * pageSize + pageSize
      )
    : sortDataset(sampleContent, currentSort);

  const totalPages = Math.ceil(largeDataset.length / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-[#1a1a1a] text-[#e0e0e0] font-sans min-h-screen">
      
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        masterData={MASTER_DATA}
      />
      <div
        className={`fixed inset-0 bg-black/50 z-[900] transition-opacity duration-250 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />
      <main>
        <SearchBar
          onSearchClick={() => setIsSearchModalOpen(true)}
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        <ContentGrid
          content={currentContent}
          currentSort={currentSort}
          setCurrentSort={setCurrentSort}
          isPaginated={isPaginated}
          setIsPaginated={setIsPaginated}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onReset={() => {
            setIsPaginated(false);
            setCurrentPage(1);
          }}
        />
      </main>
      <Footer />
      {isSearchModalOpen && (
        <SearchModal
          onClose={() => setIsSearchModalOpen(false)}
          content={largeDataset}
        />
      )}
    </div>
  );
}
