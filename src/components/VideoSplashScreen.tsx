import { motion } from "framer-motion";
import { useEffect } from "react";

interface VideoSplashScreenProps {
  onVideoEnd: () => void;
}

const VideoSplashScreen = ({ onVideoEnd }: VideoSplashScreenProps) => {
  useEffect(() => {
    // Set a timeout as fallback in case the video doesn't load or play
    const timer = setTimeout(() => {
      onVideoEnd();
    }, 3000); // 3 seconds fallback

    return () => clearTimeout(timer);
  }, [onVideoEnd]);

  return (
    <motion.div
      className="fixed inset-0 bg-background flex items-center justify-center z-[9999]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <video
        src="/eyeq vedio.mp4"
        autoPlay
        muted
        playsInline
        onEnded={onVideoEnd}
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
};

export default VideoSplashScreen;