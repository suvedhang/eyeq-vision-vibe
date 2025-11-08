import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AlternatingTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

const AlternatingText = ({
  text,
  className = '',
  delay = 0,
  duration = 0.8,
}: AlternatingTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const letters = containerRef.current.querySelectorAll('.alt-letter');

    // Set initial state for each letter
    letters.forEach((letter, index) => {
      const isEven = index % 2 === 0;
      gsap.set(letter, {
        opacity: 0,
        x: isEven ? -100 : 100,
      });
    });

    // Animate letters on scroll
    gsap.to(letters, {
      opacity: 1,
      x: 0,
      duration,
      ease: 'power3.out',
      stagger: 0.03,
      delay,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [text, delay, duration]);

  return (
    <div ref={containerRef} className={className}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className={`alt-letter ${char === '\n' ? 'block w-full' : 'inline-block'}`}
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char === '\n' ? '' : char}
        </span>
      ))}
    </div>
  );
};

export default AlternatingText;
