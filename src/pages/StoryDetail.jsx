import '../styles/StoryDetail.css';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const StoryDetail = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stories = JSON.parse(localStorage.getItem('memorylane_stories')) || [];
    const currentUser = JSON.parse(localStorage.getItem('memorylane_user'));
    const found = stories.find((s) => s.id === id);
    if (!found || found.author !== currentUser.name) {
      navigate('/');
    } else {
      setStory(found);
    }
  }, [id, navigate]);

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this story?");
    if (!confirmDelete) return;
  
    const stories = JSON.parse(localStorage.getItem('memorylane_stories')) || [];
    const updatedStories = stories.filter((s) => s.id !== story.id);
    localStorage.setItem('memorylane_stories', JSON.stringify(updatedStories));
    navigate('/');
  };

  if (!story) return null;

  return (
    <div className="story-detail-container">
      <h2>{story.title}</h2>
      {story.image ? (<img src={story.image} alt="Story" className="story-image" />) : null}
      <p className="story-content">{story.content}</p>

      <div className="story-detail-buttons">
        <Link to="/" className="back-button">← Back to Stories</Link>
        <Link to={`/edit/${story.id}`} className="edit-button">✏️ Edit Story</Link>
        <button className="delete-button" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default StoryDetail;
