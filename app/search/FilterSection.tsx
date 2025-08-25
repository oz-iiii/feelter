"use client";

import React, { useState } from "react";

interface FilterSectionProps {
  title: string;
  category: string;
  data: string[];
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  category,
  data,
}) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");

  const filteredTerms = data.filter((term) =>
    term.toLowerCase().includes(query.toLowerCase())
  );

  const handleChipRemove = (label: string) => {
    setSelected((prev) => {
      const newSet = new Set(prev);
      newSet.delete(label);
      return newSet;
    });
  };

  const handleCheckboxChange = (label: string) => {
    setSelected((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(label)) {
        newSet.delete(label);
      } else {
        newSet.add(label);
      }
      return newSet;
    });
  };

  return (
    <section>
      <h3 className="text-lg font-medium text-[#cbd5e1] mb-2">{title}</h3>
      <input
        type="text"
        placeholder={`${title.replace("별", "")} 검색`}
        className="w-full px-4 py-2 rounded-lg border border-[#2f3a4a] bg-[#0f172a] text-[#e5e7eb] placeholder:text-[#94a3b8] focus:outline-none focus:border-blue-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="flex flex-wrap gap-2 mt-2">
        {Array.from(selected).map((label) => (
          <span
            key={label}
            className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#1e293b] text-[#cbd5e1] text-xs"
          >
            {label}
            <button
              className="text-[#94a3b8] hover:text-white"
              aria-label={`${label} 제거`}
              onClick={() => handleChipRemove(label)}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="mt-4 max-h-[220px] overflow-auto bg-[#141b2d] border border-[#2f3a4a] rounded-lg">
        {filteredTerms.map((label, index) => (
          <label
            key={index}
            className="flex items-center gap-3 px-4 py-3 text-[#e5e7eb] cursor-pointer hover:bg-[#0f172a]"
          >
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-500 bg-gray-700 rounded border-gray-600 focus:ring-blue-500"
              checked={selected.has(label)}
              onChange={() => handleCheckboxChange(label)}
            />
            <span>{label}</span>
          </label>
        ))}
      </div>
    </section>
  );
};

export default FilterSection;
