import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';

const Header = () => {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [showInfo, setShowInfo] = useState(false);
  const handleSignOut = async () => {
    await signOut();
    alert('로그아웃 되었습니다.');
    router.push('/');
  };
  return (
    <header className='bg-gray-800 text-white p-4'>
      <nav className='flex justify-between container mx-auto'>
        <div>
          <Link href='/' legacyBehavior>
            <a className='text-xl font-bold mr-4'>NoticeBoard</a>
          </Link>
          <Link href='/board' legacyBehavior>
            <a className='mr-4'>Board</a>
          </Link>
        </div>
        <div className='flex items-center'>
          {user ? (
            <div className='relative'>
              <button
                onClick={() => setShowInfo((prev) => !prev)}
                className='bg-blue-500 text-white px-4 py-2 rounded'
              >
                My Info
              </button>
              {showInfo && (
                <div className='absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg p-4'>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Nickname:</strong> {user.nickname}
                  </p>
                  <p>
                    <strong>Coins:</strong> {user.coin}
                  </p>
                  <p>
                    <strong>Joined:</strong>{' '}
                    {new Date(user.created_at).toLocaleDateString()}
                  </p>
                  <button
                    onClick={handleSignOut}
                    className='bg-red-500 text-white px-4 py-2 rounded mt-2'
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href='/signin' legacyBehavior>
                <a className='mr-4'>Sign In</a>
              </Link>
              <Link href='/signup' legacyBehavior>
                <a>Sign Up</a>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Header;
