import { useState, useEffect, useRef } from "react";

interface StudyTimerProps {
  onSessionEnd: (minutes: number) => void;
}

const subjects = ["MATHEMATICS", "CODING", "READING", "HISTORY", "PHYSICS"];

const StudyTimer = ({ onSessionEnd }: StudyTimerProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [subject, setSubject] = useState(subjects[1]);
  const [lastSession, setLastSession] = useState<{subj: string, mins: number} | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const toggleTimer = () => {
    if (isRunning) {
      const minutes = Math.floor(seconds / 60);
      if (minutes > 0) {
        onSessionEnd(minutes);
        setLastSession({ subj: subject, mins: minutes });
      }
      setSeconds(0);
    }
    setIsRunning(!isRunning);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="dash-panel study-timer-refined">
      <div className="panel-header">
        <h3 className="panel-title">Focus Timer</h3>
        <select 
          className="timer-subject-pill"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          {subjects.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="timer-main-display">
        <span className="timer-val-big">{formatTime(seconds)}</span>
      </div>

      <div className="timer-actions">
        <button className="btn-primary" onClick={toggleTimer}>
          {isRunning ? "Stop Session" : "Start Focus"}
        </button>
        {lastSession && (
          <div className="last-session-info">
            <span>Last: {lastSession.mins}m on {lastSession.subj}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyTimer;
