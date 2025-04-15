// src/App.jsx
import { useState,useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import CreateStory from './pages/CreateStory';
import StoryDetail from './pages/StoryDetail';
import EditStory from './pages/EditStory';
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem('memorylane_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      {user && <Navbar user={user} />}
      <Routes>
        <Route path="/signin" element={<SignIn setUser={setUser}/>} />
        <Route path="/" element={user ? <Home /> : <Navigate to="/signin" />} />
        <Route path="/create" element={user ? <CreateStory /> : <Navigate to="/signin" />} />
        <Route path="/story/:id" element={user ? <StoryDetail /> : <Navigate to="/signin" />} />
        <Route path="/edit/:id" element={user ? <EditStory /> : <Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}

export default App;