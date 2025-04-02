import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ArticleRequestInterface } from '../../shared/types/articleRequest.interface';
import { map, Observable } from 'rxjs';
import { ArticleInterface } from '../../shared/types/article.interface';
import { ArticleResponseInterface } from '../../shared/types/articleResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class CreateArticleService {

  constructor(private http: HttpClient) { }

  createArticle(articleRequest: ArticleRequestInterface):Observable<ArticleInterface> {
    const apiUrl = environment.apiUrl + 'api/articles'
    return this.http.post<ArticleResponseInterface>(apiUrl, articleRequest).pipe(
      map((response) => response.article)
    )
  }
}
