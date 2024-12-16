import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-backend-error-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './backend-error-messages.component.html'
})
export class BackendErrorMessagesComponent {

  @Input() backendErrors: any

  errorMessages: string[] = []

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrors).map(
      (name: string) => {
        const messages = this.backendErrors[name].join('')
        return `${messages}`
      }
    )
  }
}
