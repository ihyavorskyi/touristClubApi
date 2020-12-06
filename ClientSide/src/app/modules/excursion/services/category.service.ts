import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from 'src/app/data/models/category';
import { environment } from 'src/environments/environment';


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