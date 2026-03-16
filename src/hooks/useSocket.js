// lib/useSocket.js
import { useRef, useEffect } from 'react';
import { io } from 'socket.io-client';

let socketInstance = null;

export const useSocket = url => {
  const socketRef = useRef();

  useEffect(() => {
    if (!socketInstance && url) {
      socketInstance = io(url, {
        transports: ['websocket'],
      });

      socketInstance.on('connect', () => {
        console.log('✅ Socket connected successfully:', socketInstance.id);
      });
    }

    socketRef.current = socketInstance;

    return () => {
      // Optional: disconnect on unmount if needed
      // socketRef.current?.disconnect();
    };
  }, [url]);

  return socketRef;
};
