import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { prevPrompts, setRecentPrompt, onSent, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div>
      <div className="sidebar">
        <div className="top">
          {/* Toggle sidebar extension on menu icon click */}
          <img
            onClick={() => setExtended((prev) => !prev)}
            className="menu"
            src={assets.menu_icon}
            alt="Menu Icon"
          />
          <div
            onClick={() => {
              newChat();
            }}
            className="new-chat"
          >
            <img src={assets.plus_icon} alt="Plus Icon" />
            {extended ? <p>New Chat</p> : null}
          </div>
        </div>

        {/* Display recent prompts if the sidebar is extended */}
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => (
              <div
                onClick={() => loadPrompt(item)}
                key={index}
                className="recent-entry"
              >
                <img src={assets.message_icon} alt="Message Icon" />
                <p>{item.slice(0, 18)} ...</p>
              </div>
            ))}
          </div>
        ) : null}

        <div className="bottom">
          {/* Help Section */}
          <div className="bottom-item recent-entry">
            <img src={assets.question_icon} alt="Help Icon" />
            {extended ? <p>Help</p> : null}
          </div>
          {/* Activity Section */}
          <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt="Activity Icon" />
            {extended ? <p>Activity</p> : null}
          </div>
          {/* Settings Section */}
          <div className="bottom-item recent-entry">
            <img src={assets.setting_icon} alt="Settings Icon" />
            {extended ? <p>Settings</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
