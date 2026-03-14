import { useState, useEffect } from "react";
import "./WelcomeScreen.css";

interface WelcomeScreenProps {
  onComplete: (name: string) => void;
}

const WelcomeScreen = ({ onComplete }: WelcomeScreenProps) => {
  const [name, setName] = useState("");
  const [isExiting, setIsExiting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setIsExiting(true);
      setTimeout(() => {
        onComplete(name.trim());
      }, 750);
    }
  };

  return (
    <div className={`welcome-screen ${isExiting ? "exiting" : ""}`}>
      {/* Mesh Background */}
      <div className="bg-mesh" />

      <div className="content-container">
        <span className="welcome-logo">PRODARA v0.1</span>
        
        <h1 className="question-text">HEY, WHAT'S YOUR NAME?</h1>
        
        <form onSubmit={handleSubmit} className="input-wrapper">
          <input
            type="text"
            className="name-input"
            placeholder="..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        </form>

        <button 
          className="welcome-btn" 
          onClick={handleSubmit}
          disabled={!name.trim()}
        >
          LET'S START
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
