import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/login/Login';
import MySubjects from './components/subjects/MySubjects';
import Assignment from './components/assignment/Assignment';
import AssignmentQuiz from './components/assignment/AssignmentQuiz';
import Grades from './components/grades/Grades';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/subjects" element={<MySubjects />} />
        <Route path="/assignments" element={<Assignment />} />
        <Route path="/assignments/:assignmentId" element={<AssignmentQuiz />} />
        <Route path="/grades" element={<Grades />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
