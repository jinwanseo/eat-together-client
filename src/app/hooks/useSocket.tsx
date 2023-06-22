import {useCallback} from 'react';
import {Socket, io} from 'socket.io-client';
import {BASE_URL} from './useAxios';

let socket: Socket | undefined;

export default function useSocket(): [Socket | undefined, () => void] {
  const disconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
      socket = undefined;
    }
  }, []);

  if (!socket) {
    socket = io(BASE_URL, {
      transports: ['websocket'],
    });
  }
  return [socket, disconnect];
}
