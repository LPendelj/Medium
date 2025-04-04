import { Component, OnInit } from '@angular/core';
import { ArticleFormValuesInterface } from '../../shared/components/article-form/types/articleFormValues.interface';
import { ArticleFormComponent } from '../../shared/components/article-form/article-form.component';
import { select, Store } from '@ngrx/store';
import { combineLatest, filter, map, Observable } from 'rxjs';
import { selectIsSubmitting, selectValidationErrors, selectArticle, selectIsLoading } from '../store/reducers';
import { ArticleRequestInterface } from '../../shared/types/articleRequest.interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { editArticleActions } from '../store/actions';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { ArticleInterface } from '../../shared/types/article.interface';

@Component({
  selector: 'app-edit-article',
  standalone: true,
  imports: [CommonModule, ArticleFormComponent, LoadingComponent],
  templateUrl: './edit-article.component.html'
})
export class EditArticleComponent implements OnInit{
    slug = this.route.snapshot.paramMap.get('slug') ?? ''
    initialValues$: Observable<ArticleFormValuesInterface> = this.store.pipe(
      select(selectArticle),
      filter((article): article is ArticleInterface => article !== null),
      map((article: ArticleInterface) => {
        return {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList
        }
      })
    )
  
    ngOnInit(): void {
      this.store.dispatch(editArticleActions.getArticle({slug: this.slug}))
   }

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) { }


  data$ = combineLatest(
    {
      isSubmitting: this.store.select(selectIsSubmitting),
      backendErrors: this.store.select(selectValidationErrors),
      initialValues: this.initialValues$,
      isLoading: this.store.select(selectIsLoading),
    }
  )

  onSubmit(articleFormValues: ArticleFormValuesInterface) {
    const request: ArticleRequestInterface = {
      article: articleFormValues
    }

    this.store.dispatch(editArticleActions.updateArticle({request, slug: this.slug}))
  }
}
