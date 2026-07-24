import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskPage } from './pages/TaskPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskPage />} />
      </Routes>
    </BrowserRouter>
  )
}