import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ticket } from 'src/app/data/models/ticket';


@Injectable({
    providedIn: 'root'
})
export class TicketService {
    url: string = environment.apiUrl + '/tickets';

    constructor(private http: HttpClient) {
    }

    addTicket(ticket: Ticket): Observable<boolean> {
        return this.http.post<boolean>(this.url, ticket);
    }
}