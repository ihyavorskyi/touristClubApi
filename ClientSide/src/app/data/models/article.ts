import { Comment } from './comment';
import { Topic } from './topic';
import { User } from './user';
export class Article {
    public id: number;
    public topicId: number;
    public title: string;
    public authorId: string;
    public text: string;
    public description: string;
    public image: string;
    public date: Date;

    public author: User;
    public topic: Topic;
    public comments: Comment[];
}