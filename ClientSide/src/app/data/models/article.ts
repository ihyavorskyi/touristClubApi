import { User } from './user';
export class Article {
    public id: number;
    public title: string;
    public text: string;

    public Author: User;
}