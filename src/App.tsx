import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import PrismaticPreview from "./pages/PrismaticPreview";
import NotFound from "./pages/NotFound";
import VideoSplashScreen from "@/components/VideoSplashScreen";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    // Additional fallback to ensure splash screen doesn't stay forever
    const timer = setTimeout(() => {
      if (isLoading) {
        handleLoadingComplete();
      }
    }, 3000); // 3 seconds max

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence mode="wait">
        {isLoading && <VideoSplashScreen onVideoEnd={handleLoadingComplete} />}
        {!isLoading && (
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/prismatic" element={<PrismaticPreview />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        )}
      </AnimatePresence>
    </QueryClientProvider>
  );
};

export default App;