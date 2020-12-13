import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { sendComment } from 'src/app/data/models/sendComment';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    url: string = environment.apiUrl + '/comments';


    constructor(private http: HttpClient) {
    }

    addComment(comment: sendComment): Observable<boolean> {
        return this.http.post<boolean>(this.url, comment);
    }

    deleteComment(id: number): Observable<boolean> {
        return this.http.delete<boolean>(this.url + `/${id}`);
    }
}