import { SignIn } from '@clerk/nextjs';
import React from 'react';

const SignInPage = () => {
  return (
    <main className='bg-slate-900 items-center flex min-h-screen justify-center'>
      <SignIn />
    </main>
  );
};

export default SignInPage;
