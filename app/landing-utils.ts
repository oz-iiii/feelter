// Landing page utility functions
export const handleStartClick = () => {
  console.log("시작하기 버튼이 클릭되었습니다.");
  // Navigate to /app/main
  window.location.href = '/main';
};

// Add any additional landing page functionality here
export const initializeLandingPage = () => {
  console.log("Feelter 랜딩 페이지 로드 완료!");
};