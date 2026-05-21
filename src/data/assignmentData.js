import { useEffect, useState } from 'react';
import { SUBJECT_IMAGES } from '../subjectImages';

export const QUESTION_COUNT = 20;

function buildQuestions(items) {
  return items.map((item, index) => ({
    id: index + 1,
    text: item.text,
    options: (item.options || []).map((label, i) => ({
      id: String.fromCharCode(97 + i),
      label: typeof label === 'string' ? label : label.label,
    })),
  }));
}

function normalizeAssignments(rawList) {
  if (!Array.isArray(rawList)) return [];
  return rawList.map((item) => ({
    ...item,
    image: SUBJECT_IMAGES[item.subjectId] ?? SUBJECT_IMAGES.physics,
    questions: buildQuestions(item.questions || []),
  }));
}

let cachedAssignments = null;
let fetchPromise = null;

/** Load assignments from public/school.json (dynamic config). */
export async function fetchAssignments() {
  if (cachedAssignments) return cachedAssignments;
  if (!fetchPromise) {
    fetchPromise = fetch('/school.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load school.json');
        return res.json();
      })
      .then((data) => {
        cachedAssignments = normalizeAssignments(data.assignments);
        return cachedAssignments;
      })
      .catch((err) => {
        console.error('Error loading assignments from school.json:', err);
        cachedAssignments = [];
        return cachedAssignments;
      })
      .finally(() => {
        fetchPromise = null;
      });
  }
  return fetchPromise;
}

export function getAssignmentById(assignmentId, assignments) {
  return assignments.find((a) => a.id === assignmentId) ?? null;
}

export function getInitialCompletedCount(progress) {
  return Math.min(QUESTION_COUNT, Math.max(0, Math.floor((progress / 100) * QUESTION_COUNT)));
}

/** React hook — assignments + loading state from school.json */
export function useAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchAssignments()
      .then((data) => {
        if (!cancelled) {
          setAssignments(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
          setAssignments([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { assignments, loading, error };
}
