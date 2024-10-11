import AddRoomButton from './AddRoomButton';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Layout() {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect('/sign-in');
  return (
    <AddRoomButton
      userId={clerkUser.id}
      email={clerkUser.emailAddresses[0].emailAddress}
    />
  );
}
