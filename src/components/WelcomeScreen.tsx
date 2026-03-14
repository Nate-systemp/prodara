import { useState, useRef, useEffect } from "react";
import "./WelcomeScreen.css";

interface WelcomeScreenProps {
  onComplete: (name: string) => void;
}

const WelcomeScreen = ({ onComplete }: WelcomeScreenProps) => {
  const [name, setName] = useState("");
  const [isExiting, setIsExiting] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Staggered reveal
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300);

    const focusTimer = setTimeout(() => {
      inputRef.current?.focus();
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(focusTimer);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setIsExiting(true);
      setTimeout(() => {
        onComplete(name.trim());
      }, 600);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className={`brutal-welcome ${isExiting ? "exit" : ""}`}>
      {/* Corner markers */}
      <div className="corner-mark top-left" />
      <div className="corner-mark top-right" />
      <div className="corner-mark bottom-left" />
      <div className="corner-mark bottom-right" />

      {/* Grid lines decoration */}
      <div className="grid-lines">
        <div className="grid-line horizontal h1" />
        <div className="grid-line horizontal h2" />
        <div className="grid-line vertical v1" />
        <div className="grid-line vertical v2" />
      </div>

      {/* Main content */}
      <div className={`brutal-content ${showContent ? "visible" : ""}`}>
        {/* Large decorative text in background */}
        <div className="bg-text" aria-hidden="true">?</div>

        <div className="greeting-block">
          <span className="greeting-label">001</span>
          <h1 className="greeting-hey">Hey,</h1>
          <h2 className="greeting-question">what's your<br />name?</h2>
        </div>

        <form onSubmit={handleSubmit} className="brutal-form">
          <div className="input-block">
            <div className="input-label">ENTER NAME_</div>
            <input
              ref={inputRef}
              id="welcome-name-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="..."
              autoComplete="off"
              spellCheck={false}
            />
            <div className="input-underline">
              <div className="input-fill" style={{ width: name ? "100%" : "0%" }} />
            </div>
          </div>

          <button
            id="welcome-submit-btn"
            type="submit"
            className={`brutal-btn ${name.trim() ? "active" : ""}`}
            disabled={!name.trim()}
          >
            <span className="btn-text">LET'S GO</span>
            <span className="btn-arrow">→</span>
          </button>
        </form>
      </div>

      {/* Brand */}
      <div className="brutal-brand">
        <span>PRODARA</span>
        <span className="brand-year">©2026</span>
      </div>

      {/* Side text */}
      <div className="side-text left-text">PRODUCTIVITY</div>
      <div className="side-text right-text">DASHBOARD</div>
    </div>
  );
};

export default WelcomeScreen;
