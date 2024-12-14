import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { register } from '../../store/actions';
import { selectIsSubmitting } from '../../store/reducers';
import { AuthStateInterface } from '../../types/authState.interface';

@Component({
  selector: 'app-register',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  standalone: true
})
export class RegisterComponent implements OnInit {

  form?: FormGroup


  constructor(
      private fb: FormBuilder,
      private store: Store<{auth: AuthStateInterface}>
    ){}

  isSubmitting$?: any

  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required]
    })
    this.isSubmitting$ = this.store.select(selectIsSubmitting)
  }
  onSubmit() {
    const request = {
      user: this.form?.getRawValue()
    }
    console.log(this.form?.getRawValue())
    this.store.dispatch(
      register({request})
      )
    }
    

 


  

}
