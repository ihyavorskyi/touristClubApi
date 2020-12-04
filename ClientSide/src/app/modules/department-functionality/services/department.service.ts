import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from 'src/app/data/models/department';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  url: string = environment.apiUrl + '/departments';

  constructor(private http: HttpClient) {
  }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.url);
  }

  getDepartment(id: number): Observable<Department> {
    return this.http.get<Department>(this.url + `/${id}`);
  }
}
