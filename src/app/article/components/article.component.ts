import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { articleActions } from '../store/actions';
import { combineLatest, filter, map, Observable } from 'rxjs';
import {
  selectArticleData,
  selectError,
  selectIsLoading,
} from '../store/reducers';
import { selectCurrentUser } from '../../auth/store/reducers';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { CommonModule } from '@angular/common';
import { ArticleInterface } from '../../shared/types/article.interface';
// import { ArticleResponseInterface } from '../../shared/types/articleResponse.interface';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { ErrorMessageComponent } from '../../shared/components/error-message/error-message.component';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingComponent, ErrorMessageComponent],
  templateUrl: './article.component.html',
})
export class ArticleComponent implements OnInit {
  slug: string | null = '';
  data$!: Observable<{
    isLoading: boolean;
    error: string | null;
    article: ArticleInterface | null;
    isAuthor: boolean | null;
  }>;
  isAuthor$!: Observable<boolean>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.data$ = combineLatest({
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError),
      article: this.store.select(selectArticleData),
      isAuthor: this.isAuthor$,
    });
    this.slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.store.dispatch(articleActions.getArticle({ slug: this.slug }));
    this.isAuthor$ = combineLatest({
      article: this.store.select(selectArticleData),
      currentUser: this.store
        .select(selectCurrentUser)
        .pipe(
          filter(
            (currentUser): currentUser is CurrentUserInterface | null =>
              currentUser !== undefined
          )
        ),
    }).pipe(
      map(({ article, currentUser }) => {
        if (!article || !currentUser) {
          return false;
        }
        return article.author.username === currentUser.username;
      })
    );
  }
}
