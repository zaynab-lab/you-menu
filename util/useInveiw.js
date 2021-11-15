import { useEffect, useState } from "react";

export default function useInveiw(options) {
  const [ref, setRef] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      options
    );
    ref && observer.observe(ref);
    return () => ref && observer.unobserve(ref);
  }, [ref, options]);
  return [setRef, visible];
}
