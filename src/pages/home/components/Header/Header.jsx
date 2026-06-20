import { useState, useEffect } from "react";
import { 
  Zap, Flame, Bell, Mail, Command 
} from "lucide-react";

/**
 * Header Component
 * @param {Object} props
 * @param {number} props.energy
 * @param {number} props.streak
 * @param {Function} props.onCreateBattle
 * @param {Function} props.onJoinTournament
 * @param {Function} props.onSearch
 */
export function Header({ energy, streak, onCreateBattle, onJoinTournament, onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "ByteMaster invited you to a Ranked Duel!", time: "10m ago", active: true },
    { id: 2, text: "Your DP Solution was featured in Community Feeds! 🌟", time: "1h ago", active: false },
    { id: 3, text: "Daily Tournaments bracket is now Live!", time: "3h ago", active: false }
  ]);

  const [messages, setMessages] = useState([
    { id: 1, sender: "ByteMaster", text: "GG! That binary tree solution was extremely quick.", time: "1h ago", unread: true },
    { id: 2, sender: "CodeQueen", text: "Hey! Let's team up for the weekend scrimmage?", time: "5h ago", unread: false }
  ]);

  useEffect(() => {
    onSearch(searchQuery);
  }, [searchQuery]);

  return (
    <header className="h-16 border-b border-[#1e294b]/30 bg-[#070913]/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 right-0 z-10 w-full font-sans header-main">
      <div className="relative w-96 group">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-400 transition-colors">
          <Command className="w-4 h-4" />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tournaments, users, or skills..."
          className="search-input"
        />
      </div>

      <div className="flex items-center gap-5">
        <div className="status-pill blue">
          <Zap className="w-3.5 h-3.5 text-blue-400 fill-blue-400/20" />
          <span className="value">{energy}</span>
        </div>

        <div className="status-pill orange">
          <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500/20" />
          <span className="value">{streak} Streak</span>
        </div>

        <div className="h-5 w-px bg-[#1e294b]/30" />

        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowMessages(false);
            }}
            id="btn-notifications"
            className={`header-action-button ${showNotifications ? "active" : ""}`}
          >
            <Bell className="w-4 h-4" />
            {notifications.some(n => n.active) && (
              <span className="notification-dot red" />
            )}
          </button>

          {showNotifications && (
            <div className="dropdown-menu">
              <div className="dropdown-header">
                <h3>Notifications</h3>
                <button
                  onClick={() => setNotifications(notifications.map(n => ({ ...n, active: false })))}
                  className="dropdown-link"
                >
                  Mark all read
                </button>
              </div>
              <ul className="dropdown-list">
                {notifications.map((notif) => (
                  <li key={notif.id} className={`dropdown-item ${notif.active ? "highlight" : "muted"}`}>
                    <p>{notif.text}</p>
                    <span className="timestamp">{notif.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setShowMessages(!showMessages);
              setShowNotifications(false);
            }}
            id="btn-messages"
            className={`header-action-button ${showMessages ? "active-indigo" : ""}`}
          >
            <Mail className="w-4 h-4" />
            {messages.some(m => m.unread) && (
              <span className="notification-dot indigo" />
            )}
          </button>

          {showMessages && (
            <div className="dropdown-menu">
              <div className="dropdown-header">
                <h3>Inbox</h3>
                <button
                  onClick={() => setMessages(messages.map(m => ({ ...m, unread: false })))}
                  className="dropdown-link indigo"
                >
                  Clear unreads
                </button>
              </div>
              <ul className="dropdown-list">
                {messages.map((msg) => (
                  <li key={msg.id} className={`dropdown-item flex-row ${msg.unread ? "highlight-indigo" : "muted"}`}>
                    <div className="avatar-small">
                      {msg.sender[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="item-title">
                        <span className="bold">{msg.sender}</span>
                        <span className="timestamp">{msg.time}</span>
                      </div>
                      <p className="truncate">{msg.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button
          onClick={onCreateBattle}
          id="btn-create-battle"
          className="btn-secondary"
        >
          Create Battle
        </button>

        <button
          onClick={onJoinTournament}
          id="btn-join-tournament"
          className="btn-primary"
        >
          Join Tournament
        </button>
      </div>
    </header>
  );
}
