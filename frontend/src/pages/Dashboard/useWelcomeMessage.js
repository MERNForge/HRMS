import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function useWelcomeMessage(timeout = 2000) {
  const location = useLocation();
  const navigate = useNavigate();
  const [welcomeMessage, setWelcomeMessage] = useState('');

  useEffect(() => {
    const incomingMessage = location.state?.welcomeMessage;

    if (!incomingMessage) {
      return;
    }

    setWelcomeMessage(incomingMessage);
    navigate(location.pathname, { replace: true });
  }, [location.pathname, location.state, navigate]);

  useEffect(() => {
    if (!welcomeMessage) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setWelcomeMessage('');
    }, timeout);

    return () => window.clearTimeout(timeoutId);
  }, [timeout, welcomeMessage]);

  return welcomeMessage;
}

export default useWelcomeMessage;
