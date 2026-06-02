import { useCallback, useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import '../dashboard/Dashboard.css';
import './AssignmentQuiz.css';
import { getAssignmentById, QUESTION_COUNT, useAssignments } from '../../data/assignmentData';
import {
  loadAssignmentSession,
  progressFromAnswers,
  saveAssignmentSession,
} from '../../data/assignmentProgress';

function initAnswers(assignmentId) {
  const saved = loadAssignmentSession(assignmentId);
  if (saved?.answers && typeof saved.answers === 'object') {
    return saved.answers;
  }
  return {};
}

function isAnswered(answer) {
  return answer != null && answer !== '' && answer !== '__initial__';
}

export default function AssignmentQuiz() {
  const { assignmentId } = useParams();
  const { assignments, loading, error } = useAssignments();
  const assignment = getAssignmentById(assignmentId, assignments);

  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!assignment) {
      setInitialized(false);
      return;
    }
    const initial = initAnswers(assignment.id);
    setAnswers(initial);
    const firstUnanswered = assignment.questions.findIndex((q) => !isAnswered(initial[q.id]));
    setCurrentIndex(firstUnanswered === -1 ? QUESTION_COUNT - 1 : Math.max(0, firstUnanswered));
    setInitialized(true);
  }, [assignment, assignmentId]);

  const persistSession = useCallback(
    (nextAnswers) => {
      if (!assignment) return;
      const nextProgress = progressFromAnswers(nextAnswers, QUESTION_COUNT);
      saveAssignmentSession(assignment.id, { answers: nextAnswers, progress: nextProgress });
    },
    [assignment]
  );

  if (loading) {
    return (
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard__main">
          <Header />
          <p className="assignment-quiz__loading">Loading assignment…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard__main">
          <Header />
          <p className="assignment-quiz__error" role="alert">
            Could not load assignment. Check public/school.json.
          </p>
        </div>
      </div>
    );
  }

  if (!assignment) {
    return <Navigate to="/assignments" replace />;
  }

  if (!initialized) {
    return (
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard__main">
          <Header />
          <p className="assignment-quiz__loading">Preparing questions…</p>
        </div>
      </div>
    );
  }

  const { questions, subject, title, instruction } = assignment;
  const currentQuestion = questions[currentIndex];
  const selectedOptionId = answers[currentQuestion?.id];

  const goToQuestion = (index) => {
    setCurrentIndex(index);
  };

  const goPrevious = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const goNext = () => {
    if (currentIndex < QUESTION_COUNT - 1) setCurrentIndex((i) => i + 1);
  };

  const handleSelectOption = (optionId) => {
    setAnswers((prev) => {
      const next = { ...prev, [currentQuestion.id]: optionId };
      persistSession(next);
      return next;
    });
  };

  const getQuestionState = (index) => {
    const qId = questions[index].id;
    if (isAnswered(answers[qId])) {
      return index === currentIndex ? 'answered-current' : 'answered';
    }
    if (index === currentIndex) return 'current';
    return 'pending';
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard__main">
        <Header />
        <main className="dashboard__content" aria-label={`${subject} assignment`}>
          <nav className="assignment-quiz__breadcrumbs" aria-label="Breadcrumb">
            <Link to="/assignments">Assignment</Link>
            <span className="assignment-quiz__breadcrumb-sep" aria-hidden>
              &gt;
            </span>
            <span>{subject}</span>
          </nav>

          <div className="assignment-quiz">
            <div className="assignment-quiz__left">
              <article className="assignment-quiz__info-card">
                <header className="assignment-quiz__info-head">
                  <h1 className="assignment-quiz__info-label">Assignment</h1>
                  <span className="assignment-quiz__subject-pill">{subject}</span>
                </header>
                <p className="assignment-quiz__info-title">{title}</p>
                <p className="assignment-quiz__info-instruction">
                  <span className="assignment-quiz__info-instruction-label">Instruction :</span>{' '}
                  {instruction}
                </p>
              </article>

              <article className="assignment-quiz__nav-card">
                <h2 className="assignment-quiz__nav-title">Questions</h2>
                <div className="assignment-quiz__nav-grid" role="list">
                  {questions.map((q, index) => {
                    const state = getQuestionState(index);
                    return (
                      <button
                        key={q.id}
                        type="button"
                        role="listitem"
                        className={`assignment-quiz__nav-cell assignment-quiz__nav-cell--${state}`}
                        aria-current={state === 'current' || state === 'answered-current' ? 'step' : undefined}
                        aria-label={`Question ${q.id}${isAnswered(answers[q.id]) ? ', answered' : ''}`}
                        onClick={() => goToQuestion(index)}
                      >
                        {q.id}
                      </button>
                    );
                  })}
                </div>
              </article>
            </div>

            <article className="assignment-quiz__question-card">
              <header className="assignment-quiz__question-head">
                <button
                  type="button"
                  className="assignment-quiz__nav-btn"
                  onClick={goPrevious}
                  disabled={currentIndex === 0}
                >
                  <span className="material-symbols-outlined" aria-hidden>
                    arrow_back
                  </span>
                  Previous
                </button>
                <h2 className="assignment-quiz__question-subject">{subject}</h2>
                <button
                  type="button"
                  className="assignment-quiz__nav-btn"
                  onClick={goNext}
                  disabled={currentIndex === QUESTION_COUNT - 1}
                >
                  Next
                  <span className="material-symbols-outlined" aria-hidden>
                    arrow_forward
                  </span>
                </button>
              </header>

              <p className="assignment-quiz__question-label">Question {currentQuestion.id}</p>
              <p className="assignment-quiz__question-text">{currentQuestion.text}</p>

              <fieldset className="assignment-quiz__options">
                <legend className="assignment-quiz__options-label">Options :</legend>
                <ul className="assignment-quiz__options-list">
                  {currentQuestion.options.map((opt) => (
                    <li key={opt.id}>
                      <label className="assignment-quiz__option">
                        <input
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          value={opt.id}
                          checked={selectedOptionId === opt.id}
                          onChange={() => handleSelectOption(opt.id)}
                        />
                        <span className="assignment-quiz__option-radio" aria-hidden />
                        <span className="assignment-quiz__option-text">{opt.label}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </fieldset>

              <footer className="assignment-quiz__question-foot">
                <button
                  type="button"
                  className="assignment-quiz__submit"
                  onClick={() => persistSession(answers)}
                >
                  Submit
                </button>
              </footer>
            </article>
          </div>
        </main>
      </div>
    </div>
  );
}
