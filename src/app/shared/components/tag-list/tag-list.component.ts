import { Component, Input } from '@angular/core';
import { PopularTagType } from '../../types/popularTag.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tag-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tag-list.component.html',
})
export class tagListComponent {

  @Input() tags: PopularTagType[] = [];

}
