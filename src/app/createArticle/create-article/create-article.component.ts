import { Component } from '@angular/core';
import { ArticleFormValuesInterface } from '../../shared/components/article-form/types/articleFormValues.interface';
import { ArticleFormComponent } from '../../shared/components/article-form/article-form.component';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { selectIsSubmitting, selectValidationErrors } from '../store/reducers';
import { ArticleRequestInterface } from '../../shared/types/articleRequest.interface';
import { createArticleActions } from '../store/actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-article',
  standalone: true,
  imports: [CommonModule, ArticleFormComponent],
  templateUrl: './create-article.component.html'
})
export class CreateArticleComponent {


  constructor(
    private store: Store,
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
    debugger
    this.store.dispatch(createArticleActions.createArticle({request}))
  }
}
