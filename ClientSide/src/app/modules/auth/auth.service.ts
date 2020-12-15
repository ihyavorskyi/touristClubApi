import { Injectable } from '@angular/core';
import { Environment } from '@angular/compiler-cli/src/ngtsc/typecheck/src/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthResponse } from 'src/app/data/models/auth/auth-response';
import { LoginRequest } from 'src/app/data/models/auth/login-request';
import { RegistrationRequest } from 'src/app/data/models/auth/registration-request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = environment.apiUrl + '/auth';
  requestOptions: object = {
    withCredentials: true
  };

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
  }

  login(loginModel: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.url + '/login', loginModel, this.requestOptions);
  }

  register(registerModel: RegistrationRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.url + '/register', registerModel, this.requestOptions);
  }

  roles(id: string): Observable<string[]> {
    return this.http.get<string[]>(environment.apiUrl + '/roles/user/' + `${id}`);
  }

  logOut(): void {
    this.clearStorage();
  }

  isUserAuthenticated() {
    const token: string = localStorage.getItem('jwt');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }

  clearStorage(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('uId');
    localStorage.removeItem('email');
    localStorage.removeItem('expires');
  }
}
