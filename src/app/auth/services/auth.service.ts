import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { map, Observable } from 'rxjs';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { AuthResponseInterface } from '../types/authResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface>{
    const api = 'http://localhost:3000/api/users'
    return this.http.post<AuthResponseInterface>(api, data).pipe(
      map(response => response.user)
    )
  }

}
