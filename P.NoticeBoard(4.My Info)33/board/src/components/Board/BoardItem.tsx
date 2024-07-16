import { Post } from '@/types/Post';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

interface BoardItemProps {
  post: Post;
}

const BoardItem: React.FC<BoardItemProps> = ({ post }) => {
  const isAuthenticated = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [coin, setCoin] = useState(post.coin);

  const handleDelete = async () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const res = await fetch('/api/board/deletePost', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: post.id }),
      });

      if (res.ok) {
        alert('게시글이 삭제되었습니다.');
        router.reload();
      } else {
        alert('본인이 작성한 게시글만 삭제할 수 있습니다.');
        console.error('Failed to delete the post');
      }
    }
  };

  const handleEdit = async () => {
    const res = await fetch('/api/board/updatePost', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: post.id, title, content, coin }),
    });

    if (res.ok) {
      alert('게시글이 수정되었습니다.');
      setIsEditing(false);
      router.reload();
    } else {
      alert('본인이 작성한 게시글만 수정할 수 있습니다.');
      console.error('Failed to update the post');
    }
  };

  return (
    <div className='border p-4 mb-4'>
      {isEditing ? (
        <div>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border p-2 mb-2 w-full'
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='border p-2 mb-2 w-full'
          />
          <button
            onClick={handleEdit}
            className='bg-blue-500 text-white p-2 mr-2'
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className='bg-gray-500 text-white p-2'
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <h2 className='text-xl font-bold'>{post.title}</h2>
          <p>{post.content}</p>
          <p>Coins: {coin}</p>
          {isAuthenticated && (
            <div>
              <button
                onClick={() => setIsEditing(true)}
                className='bg-yellow-500 text-white p-2 mr-2'
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className='bg-red-500 text-white p-2'
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BoardItem;
