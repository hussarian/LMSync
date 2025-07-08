import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import "./styles/App.css";
import NotificationModal from "./components/NotificationModal";
import Chat from "./components/Chat";
import Login from "./components/Login";
import ProfileDropdown from "./components/ProfileDropdown";

function App() {
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: "홍길동",
    role: "staff",
    position: "학원장",
  });

  const [activeMenu, setActiveMenu] = useState("");
  const [activeSubMenu, setActiveSubMenu] = useState("");
  const [currentPage, setCurrentPage] = useState("main");
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
    setActiveSubMenu("");
  };

  const handleSubMenuClick = (subMenuName) => {
    setActiveSubMenu(subMenuName);
  };

  const handleLogoClick = () => {
    setActiveMenu("");
    setActiveSubMenu("");
    setCurrentPage("main");
  };

  const handleNotificationClick = () => {
    setShowNotificationModal(true);
  };

  const handleChatClick = () => {
    setCurrentPage("chat");
    setActiveMenu("");
    setActiveSubMenu("");
  };

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("login");
    setShowProfileDropdown(false);
  };

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setIsLoggedIn(true);
    setCurrentPage("main");
  };

  if (!isLoggedIn || currentPage === "login") {
    return <Login onLogin={handleLogin} />;
  }

  if (currentPage === "chat") {
    return (
      <div className="app">
        <Header
          currentUser={currentUser}
          activeMenu={activeMenu}
          onMenuClick={handleMenuClick}
          onLogoClick={handleLogoClick}
          onNotificationClick={handleNotificationClick}
          onChatClick={handleChatClick}
          onProfileClick={handleProfileClick}
          showProfileDropdown={showProfileDropdown}
        />
        <Chat />
        {showNotificationModal && (
          <NotificationModal
            onClose={() => setShowNotificationModal(false)}
            onNotificationClick={(menu, subMenu) => {
              setActiveMenu(menu);
              setActiveSubMenu(subMenu);
              setCurrentPage("main");
              setShowNotificationModal(false);
            }}
          />
        )}
        {showProfileDropdown && (
          <ProfileDropdown
            currentUser={currentUser}
            onLogout={handleLogout}
            onClose={() => setShowProfileDropdown(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="app">
      <Header
        currentUser={currentUser}
        activeMenu={activeMenu}
        onMenuClick={handleMenuClick}
        onLogoClick={handleLogoClick}
        onNotificationClick={handleNotificationClick}
        onChatClick={handleChatClick}
        onProfileClick={handleProfileClick}
        showProfileDropdown={showProfileDropdown}
      />
      <div className="app-body">
        <Sidebar
          activeMenu={activeMenu}
          activeSubMenu={activeSubMenu}
          onSubMenuClick={handleSubMenuClick}
        />
        <MainContent
          activeMenu={activeMenu}
          activeSubMenu={activeSubMenu}
          currentUser={currentUser}
        />
      </div>
      {showNotificationModal && (
        <NotificationModal
          onClose={() => setShowNotificationModal(false)}
          onNotificationClick={(menu, subMenu) => {
            setActiveMenu(menu);
            setActiveSubMenu(subMenu);
            setShowNotificationModal(false);
          }}
        />
      )}
      {showProfileDropdown && (
        <ProfileDropdown
          currentUser={currentUser}
          onLogout={handleLogout}
          onClose={() => setShowProfileDropdown(false)}
        />
      )}
    </div>
  );
}

export default App; 