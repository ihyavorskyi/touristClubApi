import { ShortArticle } from '../../data/models/shortArticle';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ArticleService {
    url: string = environment.apiUrl + '/articles';

    constructor(private http: HttpClient) {
    }

    getArticles(): Observable<ShortArticle[]> {
        return this.http.get<ShortArticle[]>(this.url);
    }

    /*     getDepartment(id: number): Observable<Department> {
          return this.http.get<Department>(this.url + `/${id}`);
        } */
}