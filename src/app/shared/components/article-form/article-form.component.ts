import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { ArticleFormValuesInterface } from './types/articleFormValues.interface';
import { BackendErrorsInterface } from '../../types/backendErrors.interface';

@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [],
  templateUrl: './article-form.component.html'
})
export class ArticleFormComponent {
  @Input() initialValues?: ArticleFormValuesInterface
  @Input() isSubmitted?: boolean = false;
  @Input() errors?: BackendErrorsInterface | null = null

  @Output() articleSubmit = new EventEmitter<ArticleFormValuesInterface>()
}
