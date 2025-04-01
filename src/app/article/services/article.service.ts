import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private http: HttpClient
  ) { }

  deleteArticle(slug: string): Observable<{}>{
    const apiUrl = `${environment.apiUrl}api/articles/${slug}`
    return this.http.delete(apiUrl)
  }

  
}
