import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect('/sign-in');
  return <main>{children}</main>;
}
