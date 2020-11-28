import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../../data/models/comment';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    url: string = environment.apiUrl + '/comments';


    constructor(private http: HttpClient) {
    }

    addRecord(comment: Comment): Observable<boolean> {
        console.log(comment);
        return this.http.post<boolean>(this.url, comment);
    }
}