import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { selectCurrentUser } from '../../../auth/store/reducers';
import { CurrentUserInterface } from '../../types/currentUser.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './top-bar.component.html',
})
export class TopBarComponent {
  constructor(
    private store: Store
  ){ }

  data$!: Observable<any>

  ngOnInit(){
    this.data$ = combineLatest({
      currentUser: this.store.select(selectCurrentUser)
    })
  }

}
