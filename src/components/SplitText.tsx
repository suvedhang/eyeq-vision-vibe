import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines';
  from?: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
    rotation?: number;
  };
  to?: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
    rotation?: number;
  };
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right';
  onLetterAnimationComplete?: () => void;
}

const SplitText = ({
  text,
  className = '',
  delay = 0,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'left',
  onLetterAnimationComplete,
}: SplitTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const elements = container.querySelectorAll('.split-char, .split-word, .split-line');

    // Set initial state
    gsap.set(elements, from);

    // Create scroll trigger animation
    const animation = gsap.to(elements, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000, // Convert ms to seconds
      scrollTrigger: {
        trigger: container,
        start: `top bottom${rootMargin}`,
        toggleActions: 'play none none none',
        once: true,
      },
      onComplete: () => {
        if (onLetterAnimationComplete) {
          onLetterAnimationComplete();
        }
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [text, delay, duration, ease, from, to, threshold, rootMargin, onLetterAnimationComplete]);

  const splitText = () => {
    if (splitType === 'chars') {
      return text.split('').map((char, index) => (
        <span key={index} className="split-char inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
          {char}
        </span>
      ));
    } else if (splitType === 'words') {
      return text.split(' ').map((word, index) => (
        <span key={index} className="split-word inline-block mr-2">
          {word}
        </span>
      ));
    } else {
      return text.split('\n').map((line, index) => (
        <span key={index} className="split-line block">
          {line}
        </span>
      ));
    }
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ textAlign }}
    >
      {splitText()}
    </div>
  );
};

export default SplitText;
