import React from 'react';

const useDebounce = (value, delay) => {
  const {useState, useEffect} = React;
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

export default useDebounce;
