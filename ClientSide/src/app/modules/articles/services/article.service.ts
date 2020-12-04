import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from 'src/app/data/models/article';
import { ShortArticle } from 'src/app/data/models/shortArticle';
import { environment } from 'src/environments/environment';


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