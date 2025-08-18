"use client";

import { usePathname } from "next/navigation";
import Navbar from "./common/navbar/Navbar";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const isMyPage = pathname.startsWith("/my");

  const handleMySidebarToggle = () => {
    if (typeof window !== "undefined" && (window as unknown as { toggleMySidebar?: () => void }).toggleMySidebar) {
      (window as unknown as { toggleMySidebar: () => void }).toggleMySidebar();
    }
  };

  return (
    <>
      <Navbar onMySidebarToggle={isMyPage ? handleMySidebarToggle : undefined} />
      {children}
    </>
  );
}