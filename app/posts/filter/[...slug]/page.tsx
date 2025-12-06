// import { fetchPosts } from '@/lib/api';

export default async function PostsPage({ params }) {
  const { slug } = await params;
  console.log(slug);

  return <>Клієнтський компонент для сторінки постів</>;
}
