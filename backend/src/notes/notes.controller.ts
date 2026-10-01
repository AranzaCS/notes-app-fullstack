//API endpoints for notes.

import { Controller, Get, Post, Put, Patch, Delete, Body, Param, ParseIntPipe, Query } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from './note.entity';

@Controller('api/notes')    // Root URL for all notes API endpoints.
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  // GET /api/notes
  @Get()
  findActive(@Query('category') category?: string): Promise<Note[]> {
    return this.notesService.findActive(category);
  }

  // GET /api/notes/archived
  @Get('archived')
  findArchived(@Query('category') category?: string): Promise<Note[]> {
    return this.notesService.findArchived(category);
  }

  // POST /api/notes -> Create new note
  @Post()
  create(@Body() body: { title: string; content: string; category: string }): Promise<Note> {
    return this.notesService.create(body.title, body.content, body.category);
  }

  // PUT /api/notes/:id -> Update note
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,      // Get ID from URL and convert to int.
    @Body() body: { title: string; content: string; category: string },
  ): Promise<Note> {
    return this.notesService.update(id, body.title, body.content, body.category);
  }

  // PATCH /api/notes/:id/archive -> Toggle archived status
  @Patch(':id/archive')
  toggleArchive(@Param('id', ParseIntPipe) id: number): Promise<Note> {
    return this.notesService.toggleArchive(id);
  }

  // DELETE /api/notes/:id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.notesService.remove(id);
  }
}