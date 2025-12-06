'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { fetchPostById, fetchUserById } from '@/lib/api';

import css from './PostDetails.module.css';
import { useEffect, useState } from 'react';
import { User } from '@/types/user';

export default function PostDetailsClient() {
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
    <>
      {post && (
        <main className={css.main}>
          <div className={css.container}>
            <div className={css.item}>
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
                {user && <p className={css.user}>Author: {user.name}</p>}
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
