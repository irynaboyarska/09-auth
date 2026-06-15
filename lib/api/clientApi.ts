import type { Note } from '@/types/note';
import { api } from './api';

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface CreateNoteRequest {
  title: string;
  content: string;
  tag: string;
}

export const fetchNotes = async (
  page: number,
  perPage: number,
  search?: string,
  tag?: string
): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage,
      search,
      ...(tag ? { tag } : {}),
    },
  });

  return response.data;
};

export const createNote = async (
  note: CreateNoteRequest
): Promise<Note> => {
  const response = await api.post<Note>('/notes', note);

  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);

  return response.data;
};