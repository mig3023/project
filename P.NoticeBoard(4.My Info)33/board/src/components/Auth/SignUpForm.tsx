import { useRouter } from 'next/router';
import { useState } from 'react';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname) {
      setError('Nickname is required');
      return;
    }
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, nickname }),
    });
    if (res.ok) {
      alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
      router.push('/signin');
    } else {
      const data = await res.json();
      setError(data.message || 'Failed to sign up');
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col items-center space-y-4'
    >
      {error && <p className='text-red-500'>{error}</p>}
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email'
        className='border p-2'
        required
      />
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
        className='border p-2'
        required
      />
      <input
        type='text'
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder='Nickname'
        className='border p-2'
        required
      />
      <button type='submit' className='bg-blue-500 text-white p-2'>
        Sign Up
      </button>
    </form>
  );
};
export default SignUpForm;
