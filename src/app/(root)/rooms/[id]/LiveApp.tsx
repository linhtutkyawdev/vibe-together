'use client';

import {
  useMutation,
  useMyPresence,
  useStorage,
  useOthers,
  //  useOthersConnectionIds,
  useSelf,
} from '@liveblocks/react/suspense';
import Cursor from './Cursor';
import ReactPlayer from 'react-player';
import { useRef } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

export default function LiveApp() {
  const [, updateMyPresence] = useMyPresence();

  const { isPlaying, playedSeconds, lastModifier } = useStorage(
    (root) => root.player
  );

  const setIsPlaying = useMutation(
    ({ storage }, isPlaying: boolean) =>
      storage.get('player').set('isPlaying', isPlaying),
    []
  );
  const setPlayedSeconds = useMutation(
    ({ storage }, playedSeconds: number) =>
      storage.get('player').set('playedSeconds', playedSeconds),
    []
  );
  const setLastModifier = useMutation(
    ({ storage }, lastModifier: number) =>
      storage.get('player').set('lastModifier', lastModifier),
    []
  );

  const playerRef = useRef<ReactPlayer>(null);

  const others = useOthers();
  const self = useSelf();

  // const now = Date.now();

  return (
    <div
      className='min-w-screen min-h-screen'
      onPointerMove={(e) => {
        const cursor = { x: Math.floor(e.clientX), y: Math.floor(e.clientY) };
        updateMyPresence({ cursor });
      }}
      onPointerLeave={() => {
        updateMyPresence({ cursor: null });
      }}
      onTouchMove={(e) => {
        const touch = e.touches[0];
        const cursor = {
          x: Math.floor(touch.clientX),
          y: Math.floor(touch.clientY),
        };
        updateMyPresence({ cursor });
      }}
    >
      {
        /* live cusors */
        others.map(
          ({ connectionId, presence, info }) =>
            presence.cursor && (
              <Cursor
                key={connectionId}
                message={info.name}
                color={info.color}
                x={presence.cursor.x}
                y={presence.cursor.y}
              />
            )
        )
      }

      <div className='flex container items-center bg-black/70 mx-auto relative'>
        <div className='h-full aspect-video flex flex-col absolute'>
          <div className='flex relative grow'>
            <div
              className='grow'
              onDoubleClick={() => {
                if (!playerRef.current) return;
                const toSecond = playerRef.current.getCurrentTime() - 5;
                setLastModifier(self.connectionId);
                playerRef.current.seekTo(toSecond);
                setPlayedSeconds(toSecond);
              }}
            ></div>

            <div className='h-full flex items-center'>
              <Button
                onClick={() => {
                  setLastModifier(self.connectionId);
                  setIsPlaying(!isPlaying);
                }}
              >
                {isPlaying ? 'STOP' : 'PLAY'}
              </Button>
            </div>

            <div
              className='grow'
              onDoubleClick={() => {
                if (!playerRef.current) return;
                const toSecond = playerRef.current.getCurrentTime() + 5;
                setLastModifier(self.connectionId);
                playerRef.current.seekTo(toSecond);
                setPlayedSeconds(toSecond);
              }}
            ></div>
          </div>
          <div className='p-4 opacity-70'>
            <Slider
              min={0}
              max={playerRef.current?.getDuration() ?? 0}
              value={[playedSeconds]}
              onValueChange={(v) => {
                if (!playerRef.current) return;
                setLastModifier(self.connectionId);
                playerRef.current.seekTo(v[0]);
                setPlayedSeconds(v[0]);
              }}
            />
          </div>
        </div>
        <ReactPlayer
          ref={playerRef}
          playing={isPlaying}
          className='aspect-video'
          width={'100%'}
          height={'100%'}
          onProgress={({ playedSeconds: ps }) => {
            if (lastModifier === self.connectionId) return setPlayedSeconds(ps);
            if (ps > playedSeconds + 2 || ps < playedSeconds - 2)
              return playerRef.current?.seekTo(playedSeconds);
          }}
          url='https://www.youtube.com/watch?v=au1PyhcecWg&list=RDau1PyhcecWg&start_radio=1'
        />
      </div>
    </div>
  );
}
