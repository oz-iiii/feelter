import React from "react";
import { BiMenuAltLeft, BiSearch } from "react-icons/bi";

interface SearchBarProps {
  onSearchClick: () => void;
  onMenuClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearchClick,
  onMenuClick,
}) => {
  return (
    <section className="text-center p-16 md:p-24 bg-[#ccff00]">
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-[#100d0d]">
        통합 검색
      </h1>
      <p className="mt-2 text-base md:text-lg text-[#100d0d]">
        모든 OTT 플랫폼의 콘텐츠를 한 번에 검색해보세요
      </p>
      <form
        role="search"
        className="flex items-center w-[min(920px,92%)] mx-auto mt-6 md:mt-8 bg-[#1f2937] border border-[#2f3a4a] rounded-[9999px] p-2 md:p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]"
        onSubmit={(e) => {
          e.preventDefault();
          onSearchClick();
        }}
      >
        <button
          className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 mr-2 border-none bg-transparent text-[#cbd5e1] cursor-pointer"
          aria-label="메뉴 열기"
          type="button"
          onClick={onMenuClick}
        >
          <BiMenuAltLeft size={28} />
        </button>
        <button
          type="submit"
          className="flex-1 min-w-0 p-2 md:p-3 border-none bg-transparent text-left text-[#9aa4b2] text-base md:text-lg outline-none cursor-pointer"
        >
          영화, 드라마, 다큐멘터리를 검색해보세요
        </button>
        <button
          className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 ml-1 border-none bg-transparent text-[#9aa4b2] cursor-pointer"
          aria-label="검색"
          type="submit"
        >
          <BiSearch size={28} />
        </button>
      </form>
    </section>
  );
};

export default SearchBar;
