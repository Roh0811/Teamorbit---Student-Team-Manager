import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import AddMember from './components/AddMember';
import ViewMembers from './components/ViewMembers';
import MemberDetails from './components/MemberDetails';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/add" element={<AddMember />} />
      <Route path="/view" element={<ViewMembers />} />
      <Route path="/members/:id" element={<MemberDetails />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
