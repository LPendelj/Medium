import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleInterface } from '../types/article.interface';
import { environment } from '../../../environments/environment.development';
import { ArticleResponseInterface } from '../types/articleResponse.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private http: HttpClient
  ) { }

  getArticle(slug: string){
    const apiUrl = `${environment.apiUrl}api/articles/${slug}`
    return this.http.get<ArticleResponseInterface>(apiUrl)
      .pipe(map((response)=> response.article))
  }
}
