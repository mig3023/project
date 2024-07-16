import { useState } from 'react';
import useAuth from '../../hooks/useAuth';

const CreatePostForm = () => {
  const isAuthenticated = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coin, setCoin] = useState(); // Default coin value
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setErrorMessage('제목과 내용을 모두 입력해주세요.');
      return;
    }

    const res = await fetch('/api/board/createPost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content, coin }),
    });

    if (res.ok) {
      alert('게시글이 작성되었습니다.');
      window.location.reload(); // Refresh the page after creating a post
    }
  };

  if (!isAuthenticated) return null;

  return (
    <form onSubmit={handleSubmit} className='mb-4'>
      {errorMessage && (
        <p className='text-red-500 mb-2 text-sm'>{errorMessage}</p>
      )}
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Title'
        className='border p-2 mb-2 w-full'
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder='Content'
        className='border p-2 mb-2 w-full'
      />
      <input
        type='number'
        value={coin}
        onChange={(e) => setCoin(parseInt(e.target.value))}
        placeholder='Coin'
        className='border p-2 mb-2 w-full'
        min='0'
      />
      <button type='submit' className='bg-blue-500 text-white p-2'>
        Create Post
      </button>
    </form>
  );
};

export default CreatePostForm;
