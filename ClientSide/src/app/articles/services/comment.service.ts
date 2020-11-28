import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { sendComment } from '../../data/models/sendComment';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    url: string = environment.apiUrl + '/comments';


    constructor(private http: HttpClient) {
    }

    addRecord(comment: sendComment): Observable<boolean> {
        console.log(comment);
        return this.http.post<boolean>(this.url, comment);
    }
}