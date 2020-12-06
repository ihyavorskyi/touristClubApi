import { User } from './user';
export class Comment {
    id: number;
    text: string;
    authorId: string;
    articleId: number;
    date: Date;

    author: User;
}