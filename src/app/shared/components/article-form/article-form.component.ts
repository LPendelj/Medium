import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { ArticleFormValuesInterface } from './types/articleFormValues.interface';
import { BackendErrorsInterface } from '../../types/backendErrors.interface';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BackendErrorMessagesComponent } from '../backend-error-messages/backend-error-messages.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [BackendErrorMessagesComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './article-form.component.html'
})
export class ArticleFormComponent implements OnInit {
  @Input() initialValues?: ArticleFormValuesInterface
  @Input() isSubmitted?: boolean = false;
  @Input() errors?: BackendErrorsInterface | null = null

  @Output() articleSubmit = new EventEmitter<ArticleFormValuesInterface>()

  @Input() isSubmitting = false

  constructor(
      private fb: FormBuilder
    ){}

  ngOnInit(): void {
    this.initializeForm()
  }
  initializeForm() {
    if(!this.initialValues){
      throw new Error('Inputs are not provided!')
    }

   this.form.patchValue({
    title: this.initialValues?.title,
    description: this.initialValues?.description,
    body: this.initialValues?.body,
    tagList: this.initialValues?.tagList.join(' ')
   })
  }

  onSubmit(): void {
    const articleFormValues: ArticleFormValuesInterface = {
      ...this.form.getRawValue(),
      tagList: this.form.getRawValue().tagList.split(' ')
    }
    this.articleSubmit.emit(articleFormValues)
  }

  form = this.fb.nonNullable.group({
    title: '',
    description: '',
    body: '',
    tagList: ''
  })

  
}
