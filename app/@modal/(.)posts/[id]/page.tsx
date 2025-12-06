import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import PostDetailsClient from './PostPreview.client';
import { fetchPostById } from '@/lib/api';
// import { fetchPostById } from '@/lib/api';

interface PostPreviewProps {
  params: Promise<{ id: string }>;
}

export default async function PostPreview({ params }: PostPreviewProps) {
  const { id } = await params;
  const newId = Number(id);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['post', newId],
    queryFn: () => fetchPostById(newId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetailsClient />
    </HydrationBoundary>
  );
}
