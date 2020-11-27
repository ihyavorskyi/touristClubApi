import { ShortArticle } from '../../data/models/shortArticle';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from 'src/app/data/models/article';


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

    getArticle(id: number): Observable<Article> {
        return this.http.get<Article>(this.url + `/${id}`);
    }
}