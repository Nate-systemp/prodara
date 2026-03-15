import React, { useState } from "react";
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
      // Wait for exit animation to complete
      setTimeout(() => {
        onComplete(name.trim());
      }, 700);
    }
  };

  return (
    <div className={`welcome-screen ${isExiting ? "exit" : ""}`}>
      <div className="welcome-content">
        <span className="welcome-logo">PRODARA v0.1</span>
        
        <h1 className="welcome-title">
          Your name <span className="highlight">is?</span>
        </h1>
        
        <form onSubmit={handleSubmit} className="welcome-form">
          <div className="welcome-input-group">
            <input
              type="text"
              className="welcome-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type your name..."
              autoFocus
              spellCheck={false}
            />
          </div>
          
          {name.trim().length > 0 && (
            <button type="submit" className="welcome-btn">
              Let's Go
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default WelcomeScreen;
