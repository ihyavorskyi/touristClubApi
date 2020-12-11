import { Ticket } from './../../../data/models/ticket';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { ChangePasswordRequest } from 'src/app/data/models/ChangePasswordRequest';
import { User } from 'src/app/data/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  url: string = environment.apiUrl + '/users';

  constructor(private http: HttpClient) {
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  getShortUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}/short`);
  }

  getTickets(id :string): Observable<Ticket[]> {
    console.log(`${this.url}/tickets/${id}`);
    
    return this.http.get<Ticket[]>(`${this.url}/tickets/${id}`);
  }

  updateUser(user: User): Observable<boolean> {
    return this.http.put<boolean>(this.url, user);
  }

  changePassword(model: ChangePasswordRequest): Observable<boolean> {
    return this.http.put<boolean>(`${this.url}/password`, model);
  }
}