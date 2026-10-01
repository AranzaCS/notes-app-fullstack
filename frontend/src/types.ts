export interface Note {
    id: number;
    title: string;
    content: string;
    isArchived: boolean;
    category?: string;
    createdAt: Date; 
    updatedAt: Date;
}
