import { Component, Input, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnInit{

  ngOnInit(): void {
    this.pagesCount = Math.ceil((this.total) / this.limit)
    this.pages = this.pagesCount > 0 ? this.utilsService.range(1, this.pagesCount) : []
    // console.log(this.pages)
    // console.log(this.total)
    // console.log(this.limit)
    // console.log(this.url)
    // console.log(this.currentPage)
    // console.log(this.pagesCount)
  }

constructor(private utilsService: UtilsService){}
  pages: number[] = [];
  pagesCount = 1
  @Input() total = 0 
  @Input() limit = 20
  @Input() url = ''
  @Input() currentPage = 1
  

}
