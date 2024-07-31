import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;
  private loggedIn = false;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/users/';
  }

  async registerNewUser(user: User): Promise<void> {
    try {
      await lastValueFrom(
        this.http
          .post<void>(`${this.myAppUrl}${this.myApiUrl}register`, user)
          .pipe(catchError(this.handleError))
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  async loginUser(credentials: any): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.http
          .post<any>(`${this.myAppUrl}${this.myApiUrl}login`, credentials)
          .pipe(catchError(this.handleError))
      );
      this.login();
      return response;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }


  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }


}
