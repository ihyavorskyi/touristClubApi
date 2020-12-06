import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from 'src/app/data/models/article';
import { environment } from 'src/environments/environment';
import { Topic } from 'src/app/data/models/topic';
import { Category } from 'src/app/data/models/category';
import { Excursion } from 'src/app/data/models/excursion';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    topicUrl: string = environment.apiUrl + '/topics';
    categoryUrl: string = environment.apiUrl + '/categories';
    excursionUrl: string = environment.apiUrl + '/excursions';
    articleurl: string = environment.apiUrl + '/articles';

    constructor(private http: HttpClient) {
    }

    //TOPIC
    getTopics(): Observable<Topic[]> {
        return this.http.get<Topic[]>(this.topicUrl);
    }

    getTopic(id: number): Observable<Topic> {
        return this.http.get<Topic>(this.topicUrl + `/${id}`);
    }

    deleteTopic(id: number) {
        return this.http.delete(this.topicUrl + `/${id}`);
    }

    //CATEGORY
    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.categoryUrl);
    }

    getCategory(id: number): Observable<Category> {
        return this.http.get<Category>(this.categoryUrl + `/${id}`);
    }

    deleteCategory(id: number) {
        return this.http.delete(this.categoryUrl + `/${id}`);
    }

    //ARTICLE
    getArticles(): Observable<Article[]> {
        return this.http.get<Article[]>(this.articleurl);
    }

    getArticle(id: number): Observable<Article> {
        return this.http.get<Article>(this.articleurl + `/${id}`);
    }

    deleteArticle(id: number) {
        return this.http.delete(this.articleurl + `/${id}`);
    }

    //EXCURSION
    getExcursions(): Observable<Excursion[]> {
        return this.http.get<Excursion[]>(this.excursionUrl);
    }

    getExcursion(id: number): Observable<Excursion> {
        return this.http.get<Excursion>(this.excursionUrl + `/${id}`);
    }

    deleteExcursion(id: number) {
        return this.http.delete(this.excursionUrl + `/${id}`);
    }
}