import '../styles/CreateStory.css';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

const CreateStory = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('memorylane_user');
    if (!user) navigate('/signin');
  }, [navigate]); 

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result); // base64 image
      reader.readAsDataURL(file);
    }
  };

  const handleSaveStory = () => {
    if (!title || !content) return;
    const user = JSON.parse(localStorage.getItem('memorylane_user'))
    const newStory = {
      id: Date.now().toString(),
      title,
      content,
      image,
      dateCreated: new Date().toISOString(),
      author: user.name,
    };

    const existing = JSON.parse(localStorage.getItem('memorylane_stories')) || [];
    const updated = [newStory, ...existing];
    localStorage.setItem('memorylane_stories', JSON.stringify(updated));

    navigate('/');
  };

  return (
    <div className="create-container">
      <h2>Create a New Story</h2>
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          placeholder="Enter story title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Content:</label>
        <textarea
          placeholder="Write your story..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
        ></textarea>
      </div>

      <div className="form-group">
        <label>Optional Image:</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      <button className="save-button" onClick={handleSaveStory}>Save Story</button>
    </div>
  );
};

export default CreateStory;