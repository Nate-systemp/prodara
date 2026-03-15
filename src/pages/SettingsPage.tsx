import "./SettingsPage.css";

interface SettingsPageProps {
  userName: string;
  onNameChange: (name: string) => void;
}

const SettingsPage = ({ userName, onNameChange }: SettingsPageProps) => {
  return (
    <div className="settings-page-view">
      <h1 className="page-title">Settings</h1>
      
      <div className="settings-grid-refined">
        <div className="settings-card">
          <h3>Profile Settings</h3>
          <div className="setting-item-refined">
            <label className="item-label">Display Name</label>
            <input 
              type="text" 
              className="settings-input-refined"
              value={userName} 
              onChange={(e) => onNameChange(e.target.value)} 
              placeholder="Enter your name"
            />
          </div>
        </div>

        <div className="settings-card">
          <h3>Preferences</h3>
          <div className="setting-row-refined">
            <span className="item-title">Dark Mode</span>
            <div className="classy-toggle-track active">
              <div className="classy-toggle-thumb" />
            </div>
          </div>
          <div className="setting-row-refined">
            <span className="item-title">Notifications</span>
            <div className="classy-toggle-track">
              <div className="classy-toggle-thumb" />
            </div>
          </div>
        </div>

        <div className="settings-card">
          <h3>System Info</h3>
          <div className="setting-row-refined">
            <span className="item-title">Status</span>
            <span className="val-status">Online</span>
          </div>
          <div className="setting-row-refined">
            <span className="item-title">Version</span>
            <span className="version-tag">0.1.0-Classy</span>
          </div>
        </div>
      </div>

      <div className="danger-zone-refined">
        <div className="danger-label">
          <h3>Danger Zone</h3>
          <p>This action is irreversible. Proceed with caution.</p>
        </div>
        <button className="delete-btn-classy" onClick={() => window.location.reload()}>
          Reset All Data
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
