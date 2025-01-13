import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { feedActions } from './store/actions';
import { combineLatest, Observable } from 'rxjs';
import { selectError, selectFeedData, selectIsLoading } from './store/reducers';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { LoadingComponent } from '../loading/loading.component';
import { environment } from '../../../../environments/environment';
import { PaginationComponent } from '../pagination/pagination.component';
import queryString from 'query-string';
import { TagListComponent } from '../tag-list/tag-list.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, RouterLink, ErrorMessageComponent, LoadingComponent, PaginationComponent, TagListComponent],
  templateUrl: './feed.component.html'
})
export class FeedComponent implements OnInit {

  data$!: Observable<{
    isLoading: boolean,
    error: any,
    feed: any
  }>

  limit = environment.limit
  baseUrl = ''
  currentPage: number = 1


  @Input() apiUrl: string = '';
  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ){

  }
  ngOnInit(): void {
    
    this.data$ = combineLatest({
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError),
      feed: this.store.select(selectFeedData)
    })
    this.router.url.split('?')[0]
    this.route.queryParams.subscribe(
      (params) => {
        this.currentPage = Number(params['page'] || '1') 
        this.fetchFeed()
      }
    )
  }
  fetchFeed(){
    const offset = this.currentPage * this.limit - this.limit
    const parsedUrl = queryString.parseUrl(this.apiUrl)
    const stringified = queryString.stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query
    })
    console.log(stringified)
    const apiWithParams = `${parsedUrl.url}?${stringified}`
    this.store.dispatch(feedActions.getFeed({url: apiWithParams}))
  }

}
