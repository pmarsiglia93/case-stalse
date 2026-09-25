import { useEffect, useState } from 'react';

export default function useDebounce(value, delay = 450) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (Object.is(value, debouncedValue)) return undefined;
    const timer = window.setTimeout(() => setDebouncedValue(value), delay);
    return () => window.clearTimeout(timer);
  }, [value, debouncedValue, delay]);

  return debouncedValue;
}
