import { Component, OnInit } from '@angular/core';
import { ArticleFormValuesInterface } from '../../shared/components/article-form/types/articleFormValues.interface';
import { ArticleFormComponent } from '../../shared/components/article-form/article-form.component';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';
import { selectIsSubmitting, selectValidationErrors } from '../store/reducers';
import { ArticleRequestInterface } from '../../shared/types/articleRequest.interface';
import { createArticleActions } from '../store/actions';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { articleActions } from '../../article/store/actions';
import { ArticleResponseInterface } from '../../shared/types/articleResponse.interface';

@Component({
  selector: 'app-create-article',
  standalone: true,
  imports: [CommonModule, ArticleFormComponent],
  templateUrl: './create-article.component.html'
})
export class CreateArticleComponent implements OnInit{

  ngOnInit(): void {
    let slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.store.dispatch(articleActions.getArticle({slug}))
    //   .pipe(
    //     map((response: ArticleResponseInterface) => {
    //       this.initialValues = {
    //         ...response.article,
    //         tagList: []
    //       }
    //   })
    // )
  }
    
  }

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) { }

    initialValues = {
        title: '',
        description: '',
        body: '',
        tagList: []
  }

  data$ = combineLatest(
    {
      isSubmitting: this.store.select(selectIsSubmitting),
      backendErrors: this.store.select(selectValidationErrors)
    }
  )

  onSubmit(articleFormValues: ArticleFormValuesInterface) {
    const request: ArticleRequestInterface = {
      article: articleFormValues
    }
    this.store.dispatch(createArticleActions.createArticle({request}))
  }
}
