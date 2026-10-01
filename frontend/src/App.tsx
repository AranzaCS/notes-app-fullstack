import { useState, useEffect, useCallback } from 'react';
import type { Note } from './types';
import {
  getActiveNotes,
  getArchivedNotes,
  createNote,
  updateNote,
  toggleArchiveNote,
  deleteNote,
} from './api';
import { NoteCard } from './NoteCard';
import { NoteForm } from './NoteForm';

export function App() {
  const [notes, setNotes] = useState<Note[]>([]);                       // Notes currently loaded in the app
  const [view, setView] = useState<'active' | 'archived'>('active');    // Current tab view (active/archived)
  const [isFormOpen, setIsFormOpen] = useState(false);                  // Shows or hides the modal form
  const [editingNote, setEditingNote] = useState<Note | null>(null);    // Note being edited or null
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // Filter notes by category

  // Fetch notes based on the active view tab
  const fetchNotes = useCallback(async () => {
    try {
      const response = view === 'active' 
        ? await getActiveNotes(selectedCategory || undefined) 
        : await getArchivedNotes(selectedCategory || undefined);
      setNotes(response.data);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    }
  }, [view, selectedCategory]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // Get unique categories for filter dropdown
  const categories = Array.from(
    new Set(notes.map((n) => n.category).filter((c): c is string => Boolean(c)))
  );

  // FORM HANDLERS
  const handleOpenCreate = () => {
    setEditingNote(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (note: Note) => {
    setEditingNote(note);
    setIsFormOpen(true);
  };

  const handleSaveNote = async (title: string, content: string, category?: string | null) => {
    try {
      if (editingNote) {
        await updateNote(editingNote.id, { title, content, category });
      } else {
        await createNote({ title, content, category });
      }
      setIsFormOpen(false);
      setEditingNote(null);
      fetchNotes();   // Re-fetch to guarantee sync
    } catch (error) {
      console.error('Failed to save note:', error);
    }
  };

  // ACTION HANDLERS
  const handleToggleArchive = async (id: number) => {
    try {
      await toggleArchiveNote(id);
      fetchNotes();
    } catch (error) {
      console.error('Failed to toggle archive:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteNote(id);
      fetchNotes();
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Notes</h1>
      </header>

      {/* View Switcher Tabs */}
      <div style={styles.tabs}>
        <button
          style={view === 'active' ? styles.activeTab : styles.tab}
          onClick={() => setView('active')}
        >
          Active
        </button>
        <button
          style={view === 'archived' ? styles.activeTab : styles.tab}
          onClick={() => setView('archived')}
        >
          Archived
        </button>
      </div>

      {/* Category Filter */}
      {/* Controls div(? */}
      {categories.length > 0 && (
        <div style={styles.filterContainer}>
          <label>Filter Category: </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={styles.select}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      )}

      {/* Notes Grid */}
      {notes.length === 0 ? (
        <p style={styles.empty}>No {view} notes found.</p>
      ) : (
        <div style={styles.grid}>
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={handleOpenEdit}
              onToggleArchive={handleToggleArchive}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Create Note Button */}
      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <button style={styles.createBtn} onClick={handleOpenCreate}>
          + New note
        </button>
      </div>

      {/* Modal Form */}
      {isFormOpen && (
        <NoteForm
          noteToEdit={editingNote}
          onSave={handleSaveNote}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}

export default App;

const styles: Record<string, React.CSSProperties> = {
  container: { 
    maxWidth: '1200px', 
    margin: '0',  //auto
    padding: '24px', 
    fontFamily: 'sans-serif', 
    boxSizing: 'border-box' 
  },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
  createBtn: { 
    padding: '10px 20px', 
    fontSize: '1rem', 
    cursor: 'pointer', 
    backgroundColor: '#1890ff', 
    color: '#fff', 
    border: 'none', 
    borderRadius: '6px' 
  },
  tabs: { display: 'flex', gap: '12px', marginBottom: '24px', borderBottom: '2px solid #eee' },
  tab: { 
    padding: '8px 16px', 
    cursor: 'pointer', 
    background: 'none', 
    border: 'none', 
    fontSize: '1rem', 
    color: '#666' 
  },
  activeTab: { 
    padding: '8px 16px', 
    cursor: 'pointer', 
    background: 'none', 
    border: 'none', 
    fontSize: '1rem', 
    fontWeight: 'bold', 
    color: '#1890ff', 
    borderBottom: '2px solid #1890ff' 
  },
  filterContainer: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#555' },
  select: { padding: '6px 12px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '0.9rem' },
  grid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', 
    gap: '16px',
    marginTop: '16px',
    width: '100%',
  },
  empty: { textAlign: 'center', color: '#888', marginTop: '48px' },
};

