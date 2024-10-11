'use client';

import { LiveObject } from '@liveblocks/client';
import { ClientSideSuspense, RoomProvider } from '@liveblocks/react';
import { useParams } from 'next/navigation';
import { ReactNode } from 'react';

const RoomClientProvider = ({ children }: { children: ReactNode }) => {
  const params = useParams();
  return (
    <RoomProvider
      id={params.id as string}
      initialPresence={{ cursor: null }}
      initialStorage={{
        player: new LiveObject({
          playedSeconds: 0,
          isPlaying: false,
          lastModifier: 0,
        }),
      }}
    >
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        {children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default RoomClientProvider;
