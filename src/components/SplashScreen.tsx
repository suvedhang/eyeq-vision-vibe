import { motion } from "framer-motion";
import eyeqLogo from "../assets/eyeq-logo.png";

const SplashScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 bg-background flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex flex-col items-center"
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <img 
          src={eyeqLogo} 
          alt="EyeQ Logo" 
          className="w-32 h-32 object-contain"
        />
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;