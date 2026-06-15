import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import NotePreview from './NotePreview.client';
import { fetchNoteById } from '@/lib/api/serverApi';

interface NotePreviewModalProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NotePreviewModal({ params }: NotePreviewModalProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview id={id} />
    </HydrationBoundary>
  );
}
