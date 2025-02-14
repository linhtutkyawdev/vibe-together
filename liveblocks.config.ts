// Define Liveblocks types for your application

import { LiveObject } from '@liveblocks/client';

// https://liveblocks.io/docs/api-reference/liveblocks-react#Typing-your-data
declare global {
  interface Liveblocks {
    // Each user's Presence, for useMyPresence, useOthers, etc.
    Presence: {
      // Example, real-time cursor coordinates
      cursor: { x: number; y: number } | null;
    };

    // The Storage tree for the room, for useMutation, useStorage, etc.
    Storage: {
      player: LiveObject<{
        isPlaying: boolean;
        playedSeconds: number;
        lastModifier: number;
      }>;
    };

    // Custom user info set when authenticating with a secret key
    UserMeta: {
      id: string;
      info: {
        id: string;
        name: string;
        email: string;
        avatar: string;
        color: string;
      };
    };

    // Custom events, for useBroadcastEvent, useEventListener
    // RoomEvent: {};
    // Example has two events, using a union
    // | { type: "PLAY" }
    // | { type: "REACTION"; emoji: "🔥" };

    // Custom metadata set on threads, for useThreads, useCreateThread, etc.
    // ThreadMetadata: {
    // Example, attaching coordinates to a thread
    // x: number;
    // y: number;
    // };

    // Custom room info set with resolveRoomsInfo, for useRoomInfo
    // RoomInfo: {
    // Example, rooms with a title and url
    // title: string;
    // url: string;
    // };
  }
}

export {};
