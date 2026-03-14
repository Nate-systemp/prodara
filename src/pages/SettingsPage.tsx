import "./SettingsPage.css";

interface SettingsPageProps {
  userName: string;
  onNameChange: (name: string) => void;
}

const SettingsPage = ({ userName, onNameChange }: SettingsPageProps) => {
  return (
    <div className="brutal-page settings-page">
      <h1>SETTINGS_</h1>
      
      <div className="settings-grid">
        <div className="settings-section">
          <h3>PROFILE_DATA</h3>
          <div className="setting-item">
            <label>DISPLAY_NAME</label>
            <input 
              type="text" 
              value={userName} 
              onChange={(e) => onNameChange(e.target.value)} 
              placeholder="Your name..."
            />
          </div>
        </div>

        <div className="settings-section">
          <h3>PREFERENCES_</h3>
          <div className="setting-item toggle">
            <span>DARK_MODE</span>
            <div className="brutal-toggle active">ON</div>
          </div>
          <div className="setting-item toggle">
            <span>SOUND_NOTIFICATIONS</span>
            <div className="brutal-toggle">OFF</div>
          </div>
        </div>

        <div className="settings-section">
          <h3>SYSTEM_INFO</h3>
          <div className="info-row">
            <span>STATUS</span>
            <span className="val-active">ONLINE</span>
          </div>
          <div className="info-row">
            <span>VERSION</span>
            <span>0.1.0-BRUTAL</span>
          </div>
        </div>
      </div>

      <div className="danger-zone">
        <h3>DANGER_ZONE</h3>
        <button className="brutal-action-btn delete" onClick={() => window.location.reload()}>
          RESET_ALL_DATA
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
