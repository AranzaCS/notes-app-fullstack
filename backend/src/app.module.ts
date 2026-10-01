// Root module of the application, imports the NotesModule and sets up the database connection.

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqljs',
      autoSave: true,
      location: 'notes.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,    // Auto-creates database schema on application startup
    }),
    NotesModule,    // Makes the notes endpoints active when the application starts, allowing access to its services and controllers.
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}