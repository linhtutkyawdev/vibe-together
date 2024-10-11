'use server';

import { nanoid } from 'nanoid';
import { liveblocks } from '../liveblocks';
import { revalidatePath } from 'next/cache';
import { parseStringify } from '../utils';

type CreateRoomParams = {
  userId: string;
  email: string;
};

export const createRoom = async ({ userId, email }: CreateRoomParams) => {
  try {
    const room = await liveblocks.createRoom(nanoid(), {
      metadata: {
        creatorId: userId,
        email,
        title: 'Untitled',
      },
      usersAccesses: {
        [email]: ['room:write'],
      },
      defaultAccesses: ['room:write'],
    });
    revalidatePath('/');
    return parseStringify(room);
  } catch (error) {
    console.log('Error creating room: ', error);
  }
};
