import { useEffect, useRef } from "react";
import gsap from "gsap";

const AnimatedCursor = () => {
  const cursor = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      gsap.to(cursor.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div
      ref={cursor}
      className="fixed top-0 left-0 w-[20px] h-[20px] rounded-full pointer-events-none z-[9999] bg-white mix-blend-difference"
    />
  );
};

export default AnimatedCursor;
