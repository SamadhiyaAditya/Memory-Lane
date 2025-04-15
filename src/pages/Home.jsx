import '../styles/Home.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const savedStories = JSON.parse(localStorage.getItem('memorylane_stories')) || [];
    const currentUser = JSON.parse(localStorage.getItem('memorylane_user'));
    const userStories = savedStories.filter((story) => story.author === currentUser.name); // ✅ filter by name
    setStories(userStories);
  }, []);  

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this story?");
    if (!confirmDelete) return;

    const updatedStories = stories.filter((story) => story.id !== id);
    localStorage.setItem('memorylane_stories', JSON.stringify(updatedStories));
    setStories(updatedStories);
  };

  return (
    <div className="home-container">
      <h2>Your Stories</h2>
      <div className="story-list">
        {stories.length > 0 ? (
          stories.map((story) => (
            <div className="story-card" key={story.id}>
              <div className="story-card-header">
                <h3>{story.title}</h3>
                <button className="story-delete-button" onClick={() => handleDelete(story.id)}>🗑️</button>
              </div>
              <p>{story.content.slice(0, 100)}...</p>
              <Link to={`/story/${story.id}`} className="view-link">View</Link>
            </div>
          ))
        ) : (
          <p className="no-stories">No stories yet. Start by creating one!</p>
        )}
      </div>

      <Link to="/create" className="create-button">+ Create New Story</Link>
    </div>
  );
};

export default Home;