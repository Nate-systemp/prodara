import { useState, useEffect, useRef } from "react";

interface StudyTimerProps {
  onSessionEnd: (minutes: number) => void;
}

const SUBJECTS = ["Mathematics", "Physics", "Chemistry", "Literature", "Programming", "Design"];

const StudyTimer = ({ onSessionEnd }: StudyTimerProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0); // seconds
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [lastSession, setLastSession] = useState<{ subject: string; minutes: number } | null>(null);
  const [showSubjects, setShowSubjects] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleStartStop = () => {
    if (isRunning) {
      // Stop
      setIsRunning(false);
      const mins = Math.max(1, Math.round(elapsed / 60));
      setLastSession({ subject, minutes: mins });
      onSessionEnd(mins);
      setElapsed(0);
    } else {
      // Start
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsed(0);
  };

  return (
    <div className="panel study-timer">
      <div className="panel-header">
        <div className="panel-title-group">
          <span className="panel-index">03</span>
          <h3 className="panel-title">STUDY TIMER</h3>
        </div>
        {isRunning && <span className="timer-live">● LIVE</span>}
      </div>

      <div className="timer-display">
        <span className={`timer-time ${isRunning ? "running" : ""}`}>
          {formatTime(elapsed)}
        </span>
      </div>

      <div className="timer-subject-row">
        <span className="timer-subject-label">SUBJECT_</span>
        <div className="subject-selector">
          <button
            className="subject-btn"
            onClick={() => setShowSubjects(!showSubjects)}
            disabled={isRunning}
          >
            {subject}
            <span className="subject-arrow">{showSubjects ? "▲" : "▼"}</span>
          </button>
          {showSubjects && (
            <div className="subject-dropdown">
              {SUBJECTS.map((s) => (
                <div
                  key={s}
                  className={`subject-option ${s === subject ? "active" : ""}`}
                  onClick={() => {
                    setSubject(s);
                    setShowSubjects(false);
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="timer-actions">
        <button
          className={`brutal-action-btn ${isRunning ? "stop" : "start"}`}
          onClick={handleStartStop}
        >
          {isRunning ? "STOP" : "START SESSION"}
        </button>
        {elapsed > 0 && !isRunning && (
          <button className="brutal-action-btn reset" onClick={handleReset}>
            RESET
          </button>
        )}
      </div>

      {lastSession && (
        <div className="last-session">
          <span className="last-label">LAST SESSION:</span>
          <span className="last-value">{lastSession.subject} — {lastSession.minutes} min</span>
        </div>
      )}
    </div>
  );
};

export default StudyTimer;
