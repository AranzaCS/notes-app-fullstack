// Business logic for notes.

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)     // Gives access to database operations for the Note entity.
    private notesRepository: Repository<Note>,
  ) {}

  // FECTH ACTIVE (unarchived) notes
  findActive(category?: string): Promise<Note[]> {
    const where: any = { isArchived: false };
    if (category) where.category = category;    // Filter by category if provided
    return this.notesRepository.find({ where, order: { updatedAt: 'DESC' } });
  }

  // FETCH ARCHIVED notes
  findArchived(category?: string): Promise<Note[]> {
    const where: any = { isArchived: true };
    if (category) where.category = category;    // Filter by category if provided
    return this.notesRepository.find({ where, order: { updatedAt: 'DESC' } });
  }

  // CREATE a new note
  create(title: string, content: string, category: string): Promise<Note> {
    const note = this.notesRepository.create({ title, content, category });
    return this.notesRepository.save(note);
  }

  // UPDATE an existing note
  async update(id: number, title: string, content: string, category: string | null): Promise<Note> {
    const note = await this.notesRepository.findOneBy({ id });
    if (!note) {
      throw new NotFoundException(`Note ${id} - ${title} not found.`);
    }
    note.title = title;
    note.content = content;
    note.category = category;
    return this.notesRepository.save(note);
  }

  // TOGGLE ARCHIVED state
  async toggleArchive(id: number): Promise<Note> {
    const note = await this.notesRepository.findOneBy({ id });
    if (!note) {
      throw new NotFoundException(`Note ${id} not found`);
    }
    note.isArchived = !note.isArchived;
    return this.notesRepository.save(note);
  }

  // DELETE a note
  async remove(id: number): Promise<void> {
    const result = await this.notesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Note ${id} not found`);
    }
  }
}