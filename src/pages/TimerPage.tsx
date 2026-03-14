import { useState, useEffect, useRef } from "react";
import "./TimerPage.css";

interface TimerPageProps {
  studyMinutes: number;
  onSessionEnd: (minutes: number) => void;
}

const TimerPage = ({ studyMinutes, onSessionEnd }: TimerPageProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes default
  const [sessionType, setSessionType] = useState<"Focus" | "Break">("Focus");
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    if (sessionType === "Focus") {
      onSessionEnd(Math.round(25)); // Hardcoded for 25 min session for now
      alert("FOCUS_SESSION_COMPLETE. TAKE_A_BREAK.");
    } else {
      alert("BREAK_COMPLETE. READY_TO_FOCUS?");
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(sessionType === "Focus" ? 25 * 60 : 5 * 60);
  };

  const setFocus = () => {
    setIsRunning(false);
    setSessionType("Focus");
    setTimeLeft(25 * 60);
  };

  const setBreak = () => {
    setIsRunning(false);
    setSessionType("Break");
    setTimeLeft(5 * 60);
  };

  return (
    <div className="brutal-page timer-page">
      <div className="timer-header">
        <h1>FOCUS_MODE</h1>
        <div className="timer-stats">
          <span className="stat-label">TOTAL_STUDY_TIME_TODAY:</span>
          <span className="stat-value">{(studyMinutes / 60).toFixed(1)}H</span>
        </div>
      </div>

      <div className="fullscreen-timer-container">
        <div className="timer-type-selector">
          <button 
            className={`type-btn ${sessionType === "Focus" ? "active" : ""}`}
            onClick={setFocus}
          >
            FOCUS
          </button>
          <button 
            className={`type-btn ${sessionType === "Break" ? "active" : ""}`}
            onClick={setBreak}
          >
            BREAK
          </button>
        </div>

        <div className={`main-timer-display ${isRunning ? "active" : ""}`}>
          <div className="timer-ring-bg" />
          <span className="digital-time">{formatTime(timeLeft)}</span>
        </div>

        <div className="timer-controls">
          <button className="brutal-action-btn large" onClick={toggleTimer}>
            {isRunning ? "PAUSE_" : "START_"}
          </button>
          <button className="brutal-action-btn secondary" onClick={resetTimer}>
            RESET_
          </button>
        </div>
      </div>

      <div className="timer-footer">
        <span className="footer-label">POMODORO_PROTOCOL v1.0</span>
        <div className="protocol-steps">
          <div className={`step ${sessionType === "Focus" ? "current" : ""}`}>01 FOCUS</div>
          <div className="step-arrow">→</div>
          <div className={`step ${sessionType === "Break" ? "current" : ""}`}>02 BREAK</div>
        </div>
      </div>
    </div>
  );
};

export default TimerPage;
