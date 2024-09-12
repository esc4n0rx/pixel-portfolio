import React, { useState, useEffect } from 'react';
import './App.css'; 
import Desktop from './Desktop'; 
import powerOnImg from './assets/power.png'; 
import powerOffImg from './assets/power-off.png'; 
import bootSound from './assets/boot-sound.mp3';

function App() {
  const [booting, setBooting] = useState(false); 
  const [powerOn, setPowerOn] = useState(false); 
  const [shuttingDown, setShuttingDown] = useState(false); 

  useEffect(() => {
    if (powerOn && !shuttingDown) {
      setBooting(true);
      setTimeout(() => {
        setBooting(false);
        playBootSound();
      }, 12000);
    }
  }, [powerOn, shuttingDown]);

  const handlePowerOn = () => {
    if (!powerOn) {
      setPowerOn(true); 
    }
  };

  const handlePowerOff = () => {
    setShuttingDown(true);
    setTimeout(() => {
      setPowerOn(false); 
      setShuttingDown(false); 
    }, 2000); 
  };

  const playBootSound = () => {
    const audio = new Audio(bootSound);
    audio.play();
  };

  return (
    <div className="crt-container">
      <div className="crt-monitor">
        <div className="crt-screen">
          {!powerOn ? (
            <div className="power-off-text">Monitor Desligado</div>
          ) : booting ? (
            <div className="boot-screen">
              <h1 className="boot-logo">Paulo Oliveira</h1>
              <div class="spinner">
             <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            </div>
          ) : (
            <Desktop /> 
          )}
        </div>

        {/* Botões no monitor */}
        <div className="crt-buttons">
          <div className="crt-button" onClick={handlePowerOn}>
            <img src={powerOnImg} alt="Ligar" className="power-button-img" />
          </div>
          <div className="crt-button" onClick={handlePowerOff}>
            <img src={powerOffImg} alt="Desligar" className="power-button-img" />
          </div>
          <div className="crt-button"></div> {/* Botão sem função */}
        </div>
      </div>
    </div>
  );
}

export default App;
