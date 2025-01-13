import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PopularTagType } from '../../../types/popularTag.type';
import { environment } from '../../../../../environments/environment.development';
import { PopularTagsResponse } from '../types/popularTagsResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class PopularTagService {

  constructor(private http: HttpClient) { }

  getPopularTags(): Observable<PopularTagType[]>{
    const url = environment.apiUrl + 'tags'
    return this.http.get<PopularTagsResponse>(url).pipe(
      map(res => res.tags)
    )
  }
}
