import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { popularTagsActions } from './store/actions';
import { combineLatest, Observable } from 'rxjs';
import { selectError, selectIsLoading, selectPopularTagsData } from './store/reducers';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-popular-tags',
  standalone: true,
  imports: [CommonModule, LoadingComponent, ErrorMessageComponent, RouterLink],
  templateUrl: './popular-tags.component.html',
  // styleUrl: './popular-tags.component.css'
})
export class PopularTagsComponent implements OnInit {

  data$!: Observable<{
      isLoading: boolean,
      error: any,
      popularTags: any
    }>;

  constructor(private store: Store){

  }

  ngOnInit(): void {
    this.store.dispatch(popularTagsActions.getPopularTags())
    this.data$ = combineLatest({
      popularTags: this.store.select(selectPopularTagsData),
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError)
    })
  }
}
