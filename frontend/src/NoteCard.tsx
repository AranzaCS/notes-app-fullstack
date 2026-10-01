// Individual note component to display the data and actions

import React from 'react';
import type { Note } from './types';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onToggleArchive: (id: number) => void;
  onDelete: (id: number) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  onEdit,
  onToggleArchive,
  onDelete,
}) => {
  return (
    <div style={styles.card}>
      <div>
        <h3 style={styles.title}>{note.title}</h3>
        <p style={styles.content}>{note.content}</p>
        {note.category && <span style={styles.badge}>{note.category}</span>}    {/* Display category if it exists */}
      </div>

      <div style={styles.footer}>
        <small style={styles.date}>
          {new Date(note.createdAt).toLocaleDateString()}
        </small>
        
        <div style={styles.actions}>
          <button style={styles.archiveBtn} onClick={() => onToggleArchive(note.id)}>
            {note.isArchived ? 'Unarchive' : 'Archive'}
          </button>
          <button style={styles.editBtn} onClick={() => onEdit(note)}>
            Edit
          </button>
          <button style={styles.deleteBtn} onClick={() => onDelete(note.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    minHeight: '180px',
    boxSizing: 'border-box',
  },
  badge: {
    display: 'inline-block',
    backgroundColor: '#e6f7ff',
    color: '#1890ff',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    marginBottom: '8px',
    border: '1px solid #91d5ff',
  },
  title: { margin: '0 0 8px 0', fontSize: '1.25rem', color: '#333' },
  content: { margin: '0 0 16px 0', color: '#555', whiteSpace: 'pre-wrap' },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  date: { color: '#888' },
  actions: { display: 'flex', gap: '8px' },
  editBtn: { padding: '4px 8px', cursor: 'pointer' },
  archiveBtn: { padding: '4px 8px', cursor: 'pointer' },
  deleteBtn: { 
    padding: '4px 8px', 
    cursor: 'pointer', 
    backgroundColor: '#ff4d4f', 
    color: '#fff', 
    border: 'none', 
    borderRadius: '4px' 
  },
};