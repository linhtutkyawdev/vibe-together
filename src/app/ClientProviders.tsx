'use client';

import { ReactNode } from 'react';
import { LiveblocksProvider } from '@liveblocks/react/suspense';

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <LiveblocksProvider authEndpoint='/api/liveblocks-auth'>
      {children}
    </LiveblocksProvider>
  );
}
