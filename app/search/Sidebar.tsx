"use client";

import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import FilterSection from "./FilterSection";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  masterData: { [key: string]: string[] };
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, masterData }) => {
  return (
    <aside
      className={`fixed top-0 left-0 w-80 h-screen bg-[#1f1f1f] border-r border-[#333] transform transition-transform duration-300 z-[1000] p-4 overflow-y-auto ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <button
        className="absolute top-3 right-3 w-9 h-9 rounded-full border border-[#444] bg-[#2e2e2e] text-[#ddd] cursor-pointer"
        aria-label="사이드바 닫기"
        type="button"
        onClick={onClose}
      >
        <IoCloseOutline size={28} className="mx-auto" />
      </button>
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-[#e5e7eb]">필터</h2>
        <div className="space-y-6">
          <FilterSection
            title="플랫폼별"
            category="platforms"
            data={masterData.platforms}
          />
          <FilterSection
            title="장르별"
            category="genres"
            data={masterData.genres}
          />
          <FilterSection
            title="평점별"
            category="ratings"
            data={masterData.ratings}
          />
          <FilterSection
            title="년도별"
            category="years"
            data={masterData.years}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
