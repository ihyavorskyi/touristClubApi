import { Ticket } from './../../../data/models/ticket';
import { Role } from './../../../data/models/role';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from 'src/app/data/models/article';
import { environment } from 'src/environments/environment';
import { Topic } from 'src/app/data/models/topic';
import { Category } from 'src/app/data/models/category';
import { Excursion } from 'src/app/data/models/excursion';
import { NewArticle } from 'src/app/data/models/newArticle';
import { User } from 'src/app/data/models/user';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    topicUrl: string = environment.apiUrl + '/topics';
    categoryUrl: string = environment.apiUrl + '/categories';
    excursionUrl: string = environment.apiUrl + '/excursions';
    articleUrl: string = environment.apiUrl + '/articles';

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
        return this.http.get<Article[]>(this.articleUrl);
    }

    getArticle(id: number): Observable<Article> {
        return this.http.get<Article>(this.articleUrl + `/${id}`);
    }

    addArticle(article: NewArticle): Observable<boolean> {
        return this.http.post<boolean>(this.articleUrl, article);
    }

    updateArticle(article: NewArticle): Observable<boolean> {
        return this.http.put<boolean>(this.articleUrl, article);
    }

    deleteArticle(id: number) {
        return this.http.delete(this.articleUrl + `/${id}`);
    }

    //EXCURSION
    getExcursions(): Observable<Excursion[]> {
        return this.http.get<Excursion[]>(this.excursionUrl);
    }

    getExcursion(id: number): Observable<Excursion> {
        return this.http.get<Excursion>(this.excursionUrl + `/${id}`);
    }

    addExcursion(excursion: Excursion): Observable<boolean> {
        return this.http.post<boolean>(this.excursionUrl, excursion);
    }

    updateExcursion(excursion: Excursion): Observable<boolean> {
        return this.http.put<boolean>(this.excursionUrl, excursion);
    }

    deleteExcursion(id: number) {
        return this.http.delete(this.excursionUrl + `/${id}`);
    }

    //USERS
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    deleteUser(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
    }

    //ROLES
    getRoles(): Observable<Role[]> {
        return this.http.get<Role[]>(`${environment.apiUrl}/roles`);
    }

    changeRole(role: Role): Observable<boolean> {
        return this.http.post<boolean>(`${environment.apiUrl}/account/roles`, role);
    }

    //TICKETS
    getTickets(): Observable<Ticket[]> {
        return this.http.get<Ticket[]>(`${environment.apiUrl}/tickets`);
    }

    deleteTicket(id: number) {
        return this.http.delete(`${environment.apiUrl}/tickets/${id}`);
    }
}