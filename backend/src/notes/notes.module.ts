//Handles the functionality of notes.

import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './note.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],      // Registers Note entity in this module for database operations.
  providers: [NotesService],
  controllers: [NotesController]
})
export class NotesModule {}

