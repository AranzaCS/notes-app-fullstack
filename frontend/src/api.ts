import axios from 'axios';
import type { Note } from './types';    // "type" to explicitly get that module and prevent executing unnecessary code

const API = axios.create({
  baseURL: 'http://localhost:3001/api/notes',
});

export const createNote = (data: { title: string; content: string; category?: string | null }) => API.post<Note>('/', data);
export const updateNote = (id: number, data: { title: string; content: string; category?: string | null }) => API.put<Note>(`/${id}`, data);
export const deleteNote = (id: number) => API.delete(`/${id}`);
export const toggleArchiveNote = (id: number) => API.patch<Note>(`/${id}/archive`);
export const getActiveNotes = (category?: string) => API.get<Note[]>('/', { params: { category } });
export const getArchivedNotes = (category?: string) => API.get<Note[]>('/archived', { params: { category } });
