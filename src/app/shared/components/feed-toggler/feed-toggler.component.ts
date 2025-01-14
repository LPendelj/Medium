import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { selectCurrentUser } from '../../../auth/store/reducers';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-feed-toggler',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './feed-toggler.component.html',
})
export class FeedTogglerComponent {
  @Input() tagName?: string;
  currentUser$: any

  constructor(
    private store: Store
  ){

  }

  ngOnInit(){
    this.currentUser$ = combineLatest(this.store.select(selectCurrentUser))
  }
}
