import '../styles/EditStory.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const EditStory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [story, setStory] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('memorylane_user');
    if (!user) navigate('/signin');
  }, [navigate]);

  useEffect(() => {
    const stories = JSON.parse(localStorage.getItem('memorylane_stories')) || [];
    const existingStory = stories.find((s) => s.id === id);
    if (!existingStory) {
      navigate('/');
    } else {
      setStory(existingStory);
      setTitle(existingStory.title);
      setContent(existingStory.content);
      setImage(existingStory.image || null);
    }
  }, [id, navigate]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    const updatedStory = {
      ...story,
      title,
      content,
      image,
    };

    const stories = JSON.parse(localStorage.getItem('memorylane_stories')) || [];
    const updatedStories = stories.map((s) => (s.id === story.id ? updatedStory : s));
    localStorage.setItem('memorylane_stories', JSON.stringify(updatedStories));

    navigate(`/story/${story.id}`);
  };

  if (!story) return null;

  return (
    <div className="edit-container">
      <h2>Edit Story</h2>
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
        ></textarea>
      </div>

      <div className="form-group">
        <label>Image:</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {image ? (
          <img src={image} alt="Preview" className="preview-image" />
        ) : null}
      </div>

      <button className="update-button" onClick={handleUpdate}>Update Story</button>
    </div>
  );
};

export default EditStory;