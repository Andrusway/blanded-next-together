'use client';

import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';
import { fetchPostById, fetchUserById } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';

import css from './PostPreview.module.css';
import { useEffect, useState } from 'react';
import { User } from '@/types/user';

export default function PostPreviewClient() {
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();
  const handleClickBack = () => router.back();

  const { id } = useParams<{ id: string }>();
  const newId = Number(id);
  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['post', newId],
    queryFn: () => fetchPostById(newId),
    refetchOnMount: false,
  });

  useEffect(() => {
    if (!post) return;
    const fn = async () => {
      const res = await fetchUserById(post.id);
      setUser(res);
    };
    fn();
  }, [post]);

  if (isLoading) return <p>Loading....</p>;

  if (error) return <p>Oops...</p>;
  return (
    <Modal onClose={handleClickBack}>
      <button onClick={handleClickBack} className={css.backBtn}>
        ← Back
      </button>
      <div className={css.post}>
        <div className={css.wrapper}>
          <div className={css.header}>
            <h2>{post?.title}</h2>
          </div>

          <p className={css.content}>{post?.body}</p>
        </div>
        <p className={css.user}>{user?.name}</p>
      </div>
    </Modal>
  );
}
