import { useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';
import useAuthStore from '../store/auth.store';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

let socket = null;

export function getSocket() {
  return socket;
}

export function useSocket() {
  const token = useAuthStore((state) => state.accessToken);
  const isConnected = useRef(false);

  useEffect(() => {
    if (!token || socket?.connected) return;

    socket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    socket.on('connect', () => {
      isConnected.current = true;
      console.log('[Socket] Connected');
    });

    socket.on('disconnect', (reason) => {
      isConnected.current = false;
      console.log('[Socket] Disconnected:', reason);
    });

    socket.on('connect_error', (error) => {
      console.error('[Socket] Connection error:', error.message);
    });

    return () => {
      if (socket) {
        socket.disconnect();
        socket = null;
        isConnected.current = false;
      }
    };
  }, [token]);

  const emit = useCallback((event, data) => {
    if (socket?.connected) {
      socket.emit(event, data);
    }
  }, []);

  const on = useCallback((event, handler) => {
    if (socket) {
      socket.on(event, handler);
      return () => socket.off(event, handler);
    }
  }, []);

  return { socket, emit, on, isConnected: isConnected.current };
}
