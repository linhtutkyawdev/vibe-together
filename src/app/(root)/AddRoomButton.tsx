'use client';

import { Button } from '@/components/ui/button';
import { createRoom } from '@/lib/actions/room.action';
import { useRouter } from 'next/navigation';

const AddRoomButton = ({
  userId,
  email,
}: {
  userId: string;
  email: string;
}) => {
  const router = useRouter();
  const addRoomHandler = async () => {
    try {
      const room = await createRoom({ userId, email });
      if (room) router.push(`/rooms/${room.id}`);
    } catch (error) {
      console.log('Error creating room: ', error);
    }
  };
  return (
    <Button type='submit' onClick={addRoomHandler}>
      Add Room
    </Button>
  );
};

export default AddRoomButton;
