import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from 'src/app/data/models/article';
import { environment } from 'src/environments/environment';
import { Topic } from 'src/app/data/models/topic';
import { Category } from 'src/app/data/models/category';
import { Excursion } from 'src/app/data/models/excursion';
import { NewArticle } from 'src/app/data/models/newArticle';

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

    addTopic(topic: Topic): Observable<boolean> {
        return this.http.post<boolean>(this.topicUrl, topic);
    }

    updateTopic(topic: Topic): Observable<boolean> {
        return this.http.put<boolean>(this.topicUrl, topic);
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

    addCategory(category: Category): Observable<boolean> {
        return this.http.post<boolean>(this.categoryUrl, category);
    }

    updateCategory(category: Category): Observable<boolean> {
        return this.http.put<boolean>(this.categoryUrl, category);
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

    addArticle(article: NewArticle): Observable<boolean> {
        return this.http.post<boolean>(this.articleurl, article);
    }

    updateArticle(article: NewArticle): Observable<boolean> {
        return this.http.put<boolean>(this.articleurl, article);
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