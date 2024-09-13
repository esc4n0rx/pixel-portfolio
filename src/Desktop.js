import React, { useState, useEffect, useRef } from 'react';
import './Desktop.css'; 
import Notification from './Notification'; 
import appleFinder from './assets/icons/Apple.Finder.png';  
import mailIcon from './assets/icons/Generic.Mail.png';  
import clockIcon from './assets/icons/Generic.Clock.png';
import scriptIcon from './assets/icons/Generic.FilmScript.png'; 
import externalDriveIcon from './assets/icons/device.harddrive-external.png';
import folderIcon from './assets/icons/Generic.Mail.png'; 
import notionIcon from './assets/icons/Notion.Notion.png';  
import mapsIcon from './assets/icons/Google.Maps.png';  
import whatsappIcon from './assets/icons/Meta.WhatsApp.png'; 
import youtubeIcon from './assets/icons/Google.Youtube.png'; 
import edgeIcon from './assets/icons/Microsoft.Edge-Chromium.png'; 
import calendarIcon from './assets/icons/Generic.Calendar.png';
import sampleVideo from './assets/vids/video.mp4'; 

function Desktop() {
  const [time, setTime] = useState(new Date());
  const [showAboutMe, setShowAboutMe] = useState(false);
  const [showClockWindow, setShowClockWindow] = useState(false);
  const [showProjectsWindow, setShowProjectsWindow] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [showNotepad, setShowNotepad] = useState(false); 
  const [projectsWindowPosition, setProjectsWindowPosition] = useState({ x: 150, y: 150 }); 
  const [aboutMePosition, setAboutMePosition] = useState({ x: 100, y: 100 });
  const [notepadPosition, setNotepadPosition] = useState({ x: 200, y: 200 }); 
  const [notepadText, setNotepadText] = useState(""); 
  const [isDragging, setIsDragging] = useState(false);
  const [draggingWindow, setDraggingWindow] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleClockClick = () => setShowClockWindow(true);
  const closeClockWindow = () => setShowClockWindow(false);
  const handleAboutMeClick = () => setShowAboutMe(true);
  const closeAboutMe = () => setShowAboutMe(false);
  const handleYouTubeClick = () => setShowVideoPlayer(true);
  const handleNotepadClick = () => setShowNotepad(true); 
  const closeNotepad = () => setShowNotepad(false);

  const getRotation = (unit, max) => (unit / max) * 360;

  const onDragStart = (e, windowType) => {
    setDraggingWindow(windowType);
    setIsDragging(true);
  };

  const onDrag = (e) => {
    if (isDragging && draggingWindow) {
      if (draggingWindow === 'projects') {
        setProjectsWindowPosition({ x: e.clientX, y: e.clientY });
      } else if (draggingWindow === 'aboutMe') {
        setAboutMePosition({ x: e.clientX, y: e.clientY });
      } else if (draggingWindow === 'notepad') {
        setNotepadPosition({ x: e.clientX, y: e.clientY });
      }
    }
  };

  const stopDrag = () => {
    setIsDragging(false);
    setDraggingWindow(null);
  };

  const handleCanvasDraw = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";

    canvas.onmousedown = (event) => {
      ctx.beginPath();
      ctx.moveTo(event.offsetX, event.offsetY);
      canvas.onmousemove = (moveEvent) => {
        ctx.lineTo(moveEvent.offsetX, moveEvent.offsetY);
        ctx.stroke();
      };
    };

    canvas.onmouseup = () => {
      canvas.onmousemove = null;
    };
  };

  return (
    <div className="desktop-container" onMouseMove={onDrag} onMouseUp={stopDrag}>
      <header className="taskbar">
        <div className="taskbar-left">
          <span>Finder</span>
          <span>Configurações</span>
          <span onClick={() => setShowProjectsWindow(true)}>Projetos</span> 
          <span>Sair</span>
        </div>
        <div className="taskbar-right">
          <span className="clock">
            {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </header>

      <div className="desktop-icons">
        <div className="icon" style={{ top: '50px', left: '50px' }} draggable>
          <img src={appleFinder} alt="Finder Icon" />
          <p>Finder</p>
        </div>

        <div className="icon" style={{ top: '150px', left: '50px' }} draggable>
          <img src={mailIcon} alt="Mail Icon" />
          <p>Email</p>
        </div>

        <div className="icon" style={{ top: '250px', left: '50px' }} draggable onClick={handleClockClick}>
          <img src={clockIcon} alt="Clock Icon" />
          <p>Relógio</p>
        </div>

        <div className="icon" style={{ top: '350px', left: '50px' }} draggable onClick={handleAboutMeClick}>
          <img src={scriptIcon} alt="Sobre Mim Icon" />
          <p>Sobre Mim</p>
        </div>

        <div className="icon" style={{ top: '450px', left: '50px' }} draggable>
          <img src={externalDriveIcon} alt="External Drive" />
          <p>Disco Externo</p>
        </div>
      </div>

      <footer className="dock">
        <div className="dock-icon" onClick={handleNotepadClick}>
          <img src={notionIcon} alt="Notion Icon" />
        </div>
        <div className="dock-icon">
          <img src={mapsIcon} alt="Maps Icon" />
        </div>
        <div className="dock-icon">
          <img src={whatsappIcon} alt="WhatsApp Icon" />
        </div>
        <div className="dock-icon" onClick={handleYouTubeClick}>
          <img src={youtubeIcon} alt="YouTube Icon" />
        </div>
        <div className="dock-icon">
          <img src={edgeIcon} alt="Edge Icon" />
        </div>
        <div className="dock-icon">
          <img src={calendarIcon} alt="Calendar Icon" />
        </div>
      </footer>

      <Notification />

      {showVideoPlayer && (
        <div className="video-player-window">
          <header className="window-header">
            <div className="window-controls">
              <span className="close" onClick={() => setShowVideoPlayer(false)}>X</span>
            </div>
            <h3>YouTube</h3>
          </header>
          <div className="window-content">
            <video width="320" height="240" controls autoPlay>
              <source src={sampleVideo} type="video/mp4" />
              Seu navegador não suporta o elemento de vídeo.
            </video>
          </div>
        </div>
      )}

      {showAboutMe && (
        <div 
          className="about-me-window"
          style={{ left: aboutMePosition.x, top: aboutMePosition.y }}
          onMouseDown={(e) => onDragStart(e, 'aboutMe')}
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
            <p>Olá, meu nome é Paulo Oliveira, sou desenvolvedor Full Stack Júnior com experiência em Python, React, Node.js, Git, e Kubernetes. Sempre focado em aprender e crescer!</p>
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

      {showProjectsWindow && (
        <div 
          className="projects-window"
          style={{ left: projectsWindowPosition.x, top: projectsWindowPosition.y }}
          onMouseDown={(e) => onDragStart(e, 'projects')}
        >
          <header className="window-header">
            <div className="window-controls">
              <span className="close" onClick={() => setShowProjectsWindow(false)}>X</span>
            </div>
            <h3>Projetos</h3>
          </header>
          <div className="window-content">
            <div className="project-icon" onClick={() => window.open('https://github.com/seu-projeto1', '_blank')}>
              <img src={folderIcon} alt="Projetos com IA" />
              <p>Projetos com IA</p>
            </div>
            <div className="project-icon" onClick={() => window.open('https://github.com/seu-projeto2', '_blank')}>
              <img src={folderIcon} alt="Colheita Certa" />
              <p>Colheita Certa</p>
            </div>
            <div className="project-icon" onClick={() => window.open('https://github.com/seu-projeto3', '_blank')}>
              <img src={folderIcon} alt="Sistema de ERP" />
              <p>Sistema de ERP</p>
            </div>
          </div>
        </div>
      )}

      {showNotepad && (
        <div 
          className="notepad-window"
          style={{ left: notepadPosition.x, top: notepadPosition.y }}
          onMouseDown={(e) => onDragStart(e, 'notepad')}
        >
          <header className="window-header">
            <div className="window-controls">
              <span className="close" onClick={closeNotepad}>X</span>
            </div>
            <h3>Bloco de Notas</h3>
          </header>
          <div className="window-content">
            <textarea
              value={notepadText}
              onChange={(e) => setNotepadText(e.target.value)}
              placeholder="Escreva aqui..."
              style={{ width: "100%", height: "100px" }}
            ></textarea>
            <canvas
              ref={canvasRef}
              width="300"
              height="200"
              style={{ border: "1px solid black", marginTop: "10px" }}
              onMouseDown={handleCanvasDraw}
            ></canvas>
          </div>
        </div>
      )}
    </div>
  );
}

export default Desktop;
