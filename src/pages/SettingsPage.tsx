import "./SettingsPage.css";

interface SettingsPageProps {
  userName: string;
  onNameChange: (name: string) => void;
}

const SettingsPage = ({ userName, onNameChange }: SettingsPageProps) => {
  return (
    <div className="brutal-page settings-page">
      <h1>SETTINGS_</h1>
      
      <div className="settings-grid-refined">
        <div className="settings-card">
          <h3>PROFILE_DATA</h3>
          <div className="setting-item-refined">
            <label className="item-label">DISPLAY NAME</label>
            <input 
              type="text" 
              className="brutal-input-refined"
              value={userName} 
              onChange={(e) => onNameChange(e.target.value)} 
              placeholder="Your name..."
            />
          </div>
        </div>

        <div className="settings-card">
          <h3>PREFERENCES</h3>
          <div className="setting-row-refined">
            <span className="item-title">DARK MODE</span>
            <div className="classy-toggle-track active">
              <div className="classy-toggle-thumb" />
            </div>
          </div>
          <div className="setting-row-refined">
            <span className="item-title">NOTIFICATIONS</span>
            <div className="classy-toggle-track">
              <div className="classy-toggle-thumb" />
            </div>
          </div>
        </div>

        <div className="settings-card">
          <h3>SYSTEM_INFO</h3>
          <div className="setting-row-refined">
            <span className="item-title">STATUS</span>
            <span className="val-status">ONLINE</span>
          </div>
          <div className="setting-row-refined">
            <span className="item-title">VERSION</span>
            <span style={{ fontWeight: 800 }}>0.1.0-CLASSY</span>
          </div>
        </div>
      </div>

      <div className="danger-zone-refined">
        <div className="danger-label">
          <h3>DANGER_ZONE</h3>
          <p>This action is irreversible. Proceed with caution.</p>
        </div>
        <button className="delete-btn-classy" onClick={() => window.location.reload()}>
          RESET_ALL_DATA
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
