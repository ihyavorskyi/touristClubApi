import { Category } from './../../data/models/category';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    url: string = environment.apiUrl + '/categories';

    constructor(private http: HttpClient) {
    }

    getCategoriesWithExursions(): Observable<Category[]> {
        return this.http.get<Category[]>(this.url);
    }
}