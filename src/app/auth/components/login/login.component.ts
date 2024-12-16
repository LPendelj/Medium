import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthStateInterface } from '../../types/authState.interface';
import { AuthService } from '../../services/auth.service';
import { combineLatest, Observable } from 'rxjs';
import { selectIsSubmitting, selectValidationErrors } from '../../store/reducers';
import { authActions } from '../../store/actions';
import { CommonModule } from '@angular/common';
import { BackendErrorMessagesComponent } from '../../../shared/components/backend-error-messages/backend-error-messages.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, BackendErrorMessagesComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form?: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: AuthStateInterface }>,
    private authService: AuthService
  ) {}

  data$?: Observable<{
    isSubmitting: any;
    backendErrors: any;
  }>;

  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      password: ['', Validators.required],
      email: ['', Validators.required],
    });

    this.data$ = combineLatest({
      isSubmitting: this.store.select(selectIsSubmitting),
      backendErrors: this.store.select(selectValidationErrors),
    });
  }

  onSubmit() {
    const request = {
      user: this.form?.getRawValue(),
    };
    this.store.dispatch(authActions.login({ request }));

    // this.authService.login(request).subscribe((res) => console.log(res));
  }
}
