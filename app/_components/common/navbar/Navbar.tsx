"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

interface NavbarProps {
  onMySidebarToggle?: () => void;
}

export default function Navbar({ onMySidebarToggle }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const isMyPage = pathname.startsWith("/my");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search/results?q=${encodeURIComponent(
        searchQuery
      )}`;
    }
  };

  const handleMySidebarToggle = () => {
    if (onMySidebarToggle) {
      onMySidebarToggle();
    } else if (
      typeof window !== "undefined" &&
      typeof (window as Window & { toggleMySidebar?: () => void })
        .toggleMySidebar === "function"
    ) {
      (window as Window & { toggleMySidebar?: () => void }).toggleMySidebar!();
    }
  };

  return (
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-[#ccff00] hover:text-[#b8e600]"
            >
              Feelter
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="영화 검색..."
                className="w-full px-4 py-2 pl-10 pr-4 text-sm border border-gray-600 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ccff00] focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </form>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="#"
              className="text-gray-300 hover:text-[#ccff00] px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              메인
            </Link>
            <Link
              href="/search"
              className="text-gray-300 hover:text-[#ccff00] px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              통합검색
            </Link>
            <Link
              href="/community"
              className="text-gray-300 hover:text-[#ccff00] px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              커뮤니티
            </Link>
            <Link
              href="/my"
              className="text-gray-300 hover:text-[#ccff00] px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              마이페이지
            </Link>
          </div>

          {/* Mobile buttons */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Community link button - always show */}
            <Link
              href="/community"
              className="text-gray-300 hover:text-[#ccff00] p-2"
              title="커뮤니티"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </Link>

            {/* My page button - navigate or toggle sidebar */}
            {isMyPage ? (
              <button
                onClick={handleMySidebarToggle}
                className="text-gray-300 hover:text-[#ccff00] p-2"
                title="마이페이지 메뉴"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>
            ) : (
              <Link
                href="/my"
                className="text-gray-300 hover:text-[#ccff00] p-2"
                title="마이페이지"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
