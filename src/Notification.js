import React, { useState, useEffect } from 'react';
import './Notification.css'; // Arquivo de CSS separado para notificações

const Notification = () => {
  const [notification, setNotification] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  // Lista de mensagens de notificação
  const notificationsList = [
    { type: 'email', message: 'Você tem 1 novo e-mail.' },
    { type: 'system', message: 'Atualização de sistema disponível.' },
    { type: 'funny', message: 'Hora de uma pausa para o café!' },
  ];

  // Função para gerar uma notificação aleatória
  const generateNotification = () => {
    const randomNotification = notificationsList[Math.floor(Math.random() * notificationsList.length)];
    setNotification(randomNotification);
    setShowNotification(true);

    // A notificação desaparece após 5 segundos
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  // UseEffect para gerar uma notificação a cada 10 segundos (ajustável)
  useEffect(() => {
    const notificationInterval = setInterval(() => {
      generateNotification();
    }, 10000); // Notificação a cada 10 segundos

    // Limpa o intervalo quando o componente for desmontado
    return () => clearInterval(notificationInterval);
  }, []); // Remover o `generateNotification` da dependência

  return (
    <>
      {showNotification && (
        <div className="notification">
          <p>{notification.message}</p>
        </div>
      )}
    </>
  );
};

export default Notification;
