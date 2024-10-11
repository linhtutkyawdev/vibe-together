import { SignUp } from '@clerk/nextjs';
import React from 'react';

const SignUpPage = () => {
  return (
    <main className='bg-slate-900 items-center flex min-h-screen justify-center'>
      <SignUp />
    </main>
  );
};

export default SignUpPage;
