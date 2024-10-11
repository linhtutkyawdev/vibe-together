import { liveblocks } from '@/lib/liveblocks';
import LiveApp from './LiveApp';
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const room = await liveblocks.getRoom(id);
  const user = await currentUser();
  if (!user) {
    return redirect('/sign-in');
  }
  const hasAccess = Object.keys(room.usersAccesses).includes(
    user.emailAddresses[0].emailAddress
  );
  if (!hasAccess) {
    // return "You don't have access!";
  }
  return <LiveApp />;
}
