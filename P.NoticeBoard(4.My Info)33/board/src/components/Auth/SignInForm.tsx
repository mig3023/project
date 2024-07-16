import { useRouter } from 'next/router';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { reloadUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      await reloadUser();
      alert('로그인이 완료되었습니다.');
      router.push('/board').then(() => {
        window.location.reload();
      });
    } else {
      alert('등록된 회원이 아니거나 잘못 입력하였습니다.');
      console.error('Failed to sign in');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col items-center space-y-4'
    >
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email'
        className='border p-2'
      />
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
        className='border p-2'
      />
      <button type='submit' className='bg-blue-500 text-white p-2'>
        Sign In
      </button>
    </form>
  );
};

export default SignInForm;
