import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/common/navbar/Navbar";

const notoSansKR = Noto_Sans_KR({
	variable: "--font-noto-sans-kr",
	subsets: ["latin"],
	weight: ["400", "700"],
});

export const metadata: Metadata = {
	title: "Feelter - 당신의 엔터테인먼트 허브",
	description: "OTT 플랫폼 추천 작품 서비스",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko">
			<body
				className={`${notoSansKR.variable} font-sans antialiased min-h-screen bg-black text-[#f0f0f0]`}
			>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
