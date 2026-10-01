// Form fields for creating and editing notes

import React, { useState, useEffect } from 'react';
import type { Note } from './types';

interface NoteFormProps {
  noteToEdit: Note | null;
  onSave: (title: string, content: string, category?: string | null) => void;
  onCancel: () => void;
}

export const NoteForm: React.FC<NoteFormProps> = ({ 
    noteToEdit, 
    onSave, 
    onCancel 
}) => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  // Show note data if available, else clear the form
  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setCategory(noteToEdit.category || '');
    } else {
      setTitle('');
      setContent('');
      setCategory('');
    }
  }, [noteToEdit]);

  // Save note data
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;   // Prevent saving empty notes
    onSave(title, content, category.trim() ? category : null);  // Pass category if it's not empty, null to be able to delete it
  };

  return (
    <div style={styles.overlay}>
      <form onSubmit={handleSubmit} style={styles.form}>
        
        <div style={styles.field}>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            required
            style={styles.textarea}
          />
        </div>

        <div style={styles.field}>
          <label>Category (Optional)</label>
          <input
            type="text"
            placeholder="e.g. Work, Personal, Study"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.buttons}>
          <button type="button" onClick={onCancel} style={styles.cancelBtn}>
            Cancel
          </button>
          <button type="submit" style={styles.saveBtn}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '8px',
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  field: { display: 'flex', flexDirection: 'column', gap: '4px' },
  input: { padding: '8px', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc' },
  textarea: { padding: '8px', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc' },
  buttons: { display: 'flex', justifyContent: 'flex-end', gap: '8px' },
  cancelBtn: { padding: '8px 16px', cursor: 'pointer' },
  saveBtn: { 
    padding: '8px 16px', 
    cursor: 'pointer', 
    backgroundColor: '#1890ff', 
    color: '#fff', 
    border: 'none', 
    borderRadius: '4px' 
  },
};