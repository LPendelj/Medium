import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { feedActions } from './store/actions';
import { combineLatest, Observable } from 'rxjs';
import { selectError, selectFeedData, selectIsLoading } from './store/reducers';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './feed.component.html'
})
export class FeedComponent implements OnInit {

  data$!: Observable<{
    isLoading: boolean,
    error: any,
    feed: any
  }>


  @Input() apiUrl: string = '';
  constructor(
    private store: Store
  ){

  }
  ngOnInit(): void {
    this.store.dispatch(feedActions.getFeed({url: this.apiUrl}))
    this.data$ = combineLatest({
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError),
      feed: this.store.select(selectFeedData)
    })
  }


}
