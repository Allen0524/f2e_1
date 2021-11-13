import { useState, useEffect } from "react";

export default function useMedia(query) {
  const [matches, setMatches] = useState(null);

  useEffect(() => {
    setMatches(window.matchMedia(query).matches);
  }, []);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
}
