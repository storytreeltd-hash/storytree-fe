"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  end: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
  delay?: number;
  className?: string;
};

export function CountUp({
  end,
  decimals = 0,
  suffix = "",
  duration = 2,
  delay = 0,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    setHasStarted(true);

    const controls = animate(0, end, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setValue(latest),
    });

    return () => controls.stop();
  }, [isInView, end, duration, delay]);

  if (!hasStarted) {
    return (
      <span ref={ref} className={className} aria-hidden="true">
        0{suffix}
      </span>
    );
  }

  const formatted =
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();

  return (
    <span ref={ref} className={className}>
      {formatted}
      {suffix}
    </span>
  );
}
