import React, { useState, useEffect } from 'react';
import './Desktop.css'; 

import appleFinder from './assets/icons/Apple.Finder.png';  
import mailIcon from './assets/icons/Generic.Mail.png';  
import clockIcon from './assets/icons/Generic.Clock.png';
import scriptIcon from './assets/icons/Generic.FilmScript.png'; 
import externalDriveIcon from './assets/icons/device.harddrive-external.png';

import notionIcon from './assets/icons/Notion.Notion.png';  
import mapsIcon from './assets/icons/Google.Maps.png';  
import whatsappIcon from './assets/icons/Meta.WhatsApp.png'; 
import youtubeIcon from './assets/icons/Google.Youtube.png'; 
import edgeIcon from './assets/icons/Microsoft.Edge-Chromium.png'; 
import calendarIcon from './assets/icons/Generic.Calendar.png';

function Desktop() {
  const [time, setTime] = useState(new Date());
  const [showAboutMe, setShowAboutMe] = useState(false);
  const [showClockWindow, setShowClockWindow] = useState(false);
  const [positions, setPositions] = useState({}); 
  const [draggingIcon, setDraggingIcon] = useState(null); 
  const [windowPosition, setWindowPosition] = useState({ x: 100, y: 100 });

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval); 
  }, []);

  useEffect(() => {
    setPositions({
      "finder": { top: '50px', left: '50px' },
      "email": { top: '150px', left: '50px' },
      "clock": { top: '250px', left: '50px' },
      "aboutMe": { top: '350px', left: '50px' },
      "external": { top: '450px', left: '50px' }
    });
  }, []);

  const handleDragStart = (e, iconId) => {
    setDraggingIcon(iconId);
    e.dataTransfer.setData('text/plain', '');
  };

  const handleDragEnd = (e) => {
    setDraggingIcon(null);
    setPositions({
      ...positions,
      [draggingIcon]: { top: `${e.clientY}px`, left: `${e.clientX}px` }
    });

    setTimeout(() => {
      setPositions({
        "finder": { top: '50px', left: '50px' },
        "email": { top: '150px', left: '50px' },
        "clock": { top: '250px', left: '50px' },
        "aboutMe": { top: '350px', left: '50px' },
        "external": { top: '450px', left: '50px' }
      });
    }, 1000); 
  };

  const handleAboutMeClick = () => {
    setShowAboutMe(true);
  };

  const closeAboutMe = () => {
    setShowAboutMe(false);
  };

  const handleClockClick = () => {
    setShowClockWindow(true);
  };

  const closeClockWindow = () => {
    setShowClockWindow(false);
  };

  const getRotation = (unit, max) => {
    return (unit / max) * 360;
  };

  return (
    <div className="desktop-container">
      <header className="taskbar">
        <div className="taskbar-left">
          <span>Finder</span>
          <span>Configurações</span>
          <span>Projetos</span>
          <span>Sair</span>
        </div>
        <div className="taskbar-right">
          <span className="clock">
            {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </header>

      <div className="desktop-icons">
        {/* Ícones que podem ser arrastados */}
        <div
          className="icon"
          style={positions.finder}
          draggable
          onDragStart={(e) => handleDragStart(e, 'finder')}
          onDragEnd={handleDragEnd}
        >
          <img src={appleFinder} alt="Finder Icon" />
          <p>Finder</p>
        </div>

        <div
          className="icon"
          style={positions.email}
          draggable
          onDragStart={(e) => handleDragStart(e, 'email')}
          onDragEnd={handleDragEnd}
        >
          <img src={mailIcon} alt="Mail Icon" />
          <p>Email</p>
        </div>

        <div
          className="icon"
          style={positions.clock}
          draggable
          onDragStart={(e) => handleDragStart(e, 'clock')}
          onDragEnd={handleDragEnd}
          onClick={handleClockClick}  // Abrir janela do relógio
        >
          <img src={clockIcon} alt="Clock Icon" />
          <p>Relógio</p>
        </div>

        <div
          className="icon"
          style={positions.aboutMe}
          draggable
          onDragStart={(e) => handleDragStart(e, 'aboutMe')}
          onDragEnd={handleDragEnd}
          onClick={handleAboutMeClick}
        >
          <img src={scriptIcon} alt="Sobre Mim Icon" />
          <p>Sobre Mim</p>
        </div>

        <div
          className="icon"
          style={positions.external}
          draggable
          onDragStart={(e) => handleDragStart(e, 'external')}
          onDragEnd={handleDragEnd}
        >
          <img src={externalDriveIcon} alt="External Drive" />
          <p>Disco Externo</p>
        </div>
      </div>

      <footer className="dock">
        <div className="dock-icon">
          <img src={notionIcon} alt="Notion Icon" />
        </div>
        <div className="dock-icon">
          <img src={mapsIcon} alt="Maps Icon" />
        </div>
        <div className="dock-icon">
          <img src={whatsappIcon} alt="WhatsApp Icon" />
        </div>
        <div className="dock-icon">
          <img src={youtubeIcon} alt="YouTube Icon" />
        </div>
        <div className="dock-icon">
          <img src={edgeIcon} alt="Edge Icon" />
        </div>
        <div className="dock-icon">
          <img src={calendarIcon} alt="Calendar Icon" />
        </div>
      </footer>

      {showAboutMe && (
        <div 
          className="about-me-window"
          style={{ left: windowPosition.x, top: windowPosition.y }}
        >
          <header className="window-header">
            <div className="window-controls">
              <span className="close" onClick={closeAboutMe}>X</span>
              <span className="minimize">-</span>
              <span className="maximize">+</span>
            </div>
            <h3>Sobre Mim</h3>
          </header>
          <div className="window-content">
            <p>Olá, meu nome é Paulo Oliveira,</p>
          </div>
        </div>
      )}

      {showClockWindow && (
        <div className="clock-window">
          <header className="window-header">
            <div className="window-controls">
              <span className="close" onClick={closeClockWindow}>X</span>
            </div>
            <h3>Relógio</h3>
          </header>
          <div className="clock-content">
            <div className="clock-face">
              <div
                className="clock-hand hour-hand"
                style={{ transform: `rotate(${getRotation(time.getHours(), 12)}deg)` }}
              ></div>
              <div
                className="clock-hand minute-hand"
                style={{ transform: `rotate(${getRotation(time.getMinutes(), 60)}deg)` }}
              ></div>
              <div
                className="clock-hand second-hand"
                style={{ transform: `rotate(${getRotation(time.getSeconds(), 60)}deg)` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Desktop;
