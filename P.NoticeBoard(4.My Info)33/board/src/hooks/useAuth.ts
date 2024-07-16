import { useEffect, useState } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/auth/user');
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      } else {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const reloadUser = async () => {
    const res = await fetch('/api/auth/user');
    if (res.ok) {
      const userData = await res.json();
      setUser(userData);
    } else {
      setUser(null);
    }
  };

  const signOut = async () => {
    await fetch('/api/auth/signout', { method: 'POST' });
    setUser(null);
  };

  return { user, reloadUser, signOut };
};

export default useAuth;