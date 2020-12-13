import { Excursion } from 'src/app/data/models/excursion';
export class Ticket {
    id: number;
    ownerId: string;
    excursionId: number;

    excursion: Excursion;
}