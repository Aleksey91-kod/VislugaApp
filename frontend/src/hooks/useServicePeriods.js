import { useState, useEffect } from 'react';

const STORAGE_KEY = 'service_periods';

export default function useServicePeriods() {
  const [periods, setPeriods] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setPeriods(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(periods));
  }, [periods]);

  return [periods, setPeriods];
}