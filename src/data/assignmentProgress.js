const STORAGE_PREFIX = 'evodemy-assignment-';

/** Remove all saved assignment answers/progress (runs on each full page load). */
export function clearAllAssignmentSessions() {
  try {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(STORAGE_PREFIX)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key));
  } catch {
    /* ignore */
  }
}

export function loadAssignmentSession(assignmentId) {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${assignmentId}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveAssignmentSession(assignmentId, { answers, progress }) {
  try {
    localStorage.setItem(
      `${STORAGE_PREFIX}${assignmentId}`,
      JSON.stringify({ answers, progress, updatedAt: Date.now() })
    );
  } catch {
    /* ignore quota errors */
  }
}

export function getStoredProgress(assignmentId, defaultProgress = 0) {
  const session = loadAssignmentSession(assignmentId);
  return typeof session?.progress === 'number' ? session.progress : defaultProgress;
}

export function countAnswered(answers, questionCount) {
  const answered = Object.values(answers).filter(
    (value) => value != null && value !== '' && value !== '__initial__'
  ).length;
  return Math.min(questionCount, answered);
}

export function progressFromAnswers(answers, questionCount) {
  if (!questionCount) return 0;
  return Math.round((countAnswered(answers, questionCount) / questionCount) * 100);
}

export function seedInitialAnswers(questions, initialCompleted) {
  const seeded = {};
  for (let i = 0; i < initialCompleted && i < questions.length; i++) {
    seeded[questions[i].id] = '__initial__';
  }
  return seeded;
}
