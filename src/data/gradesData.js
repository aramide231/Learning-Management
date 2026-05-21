import { useEffect, useState } from 'react';

const DEFAULT_GRADES = {
  termFilters: [{ id: 'all', label: 'All' }],
  summary: {
    performance: 0,
    bestSubject: '—',
    weakSubject: '—',
    classRank: '—',
  },
  courses: [],
};

let cachedGrades = null;
let fetchPromise = null;

export async function fetchGrades() {
  if (cachedGrades) return cachedGrades;
  if (!fetchPromise) {
    fetchPromise = fetch('/school.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load school.json');
        return res.json();
      })
      .then((data) => {
        cachedGrades = {
          termFilters: data.grades?.termFilters ?? DEFAULT_GRADES.termFilters,
          summary: { ...DEFAULT_GRADES.summary, ...data.grades?.summary },
          courses: Array.isArray(data.grades?.courses) ? data.grades.courses : [],
        };
        return cachedGrades;
      })
      .catch((err) => {
        console.error('Error loading grades from school.json:', err);
        cachedGrades = DEFAULT_GRADES;
        return cachedGrades;
      })
      .finally(() => {
        fetchPromise = null;
      });
  }
  return fetchPromise;
}

export function useGrades() {
  const [grades, setGrades] = useState(DEFAULT_GRADES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchGrades()
      .then((data) => {
        if (!cancelled) {
          setGrades(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
          setGrades(DEFAULT_GRADES);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { grades, loading, error };
}
