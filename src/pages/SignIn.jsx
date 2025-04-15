import { useState,useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import '../styles/SignIn.css';

const SignIn = ({ setUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const existingUser = localStorage.getItem('memorylane_user');
    if (existingUser) {
      setIsSignedIn(true);
    }
  }, []);

  const handleSignIn = () => {
    if (!name || !email) return alert("Both fields are required!");

    const user = { name, email };
    localStorage.setItem('memorylane_user', JSON.stringify(user));
    setUser(user);
    setIsSignedIn(true);
  };

  if (isSignedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <div className="form-group">
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <button className="signin-button" onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default SignIn;