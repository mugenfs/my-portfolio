import { useEffect, useState } from "react";
import BackgroundPreview from "./components/BackgroundPreview";
import LoadingScreen from "./components/LoadingScreen";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIsFadingOut(true), 3500);
    const hideTimer = setTimeout(() => setIsLoading(false), 4500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (isLoading) return <LoadingScreen fadeOut={isFadingOut} />;
  return <BackgroundPreview />;
}
