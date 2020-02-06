import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input() list$: Observable<any[]>;
  @Input() set page(page: number) {
    this.currentPage = page - 1;
  }
  @Output() changePage: EventEmitter<number> = new EventEmitter();

  pageSize = 50;
  pages = [];
  currentPage = 0;

  constructor() { }

  ngOnInit() {
    this.list$.subscribe(
      list => {
        this.pages = new Array(Math.ceil(list.length / this.pageSize));
      }
    );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.changePage.emit(page + 1);
  }

  step(dir: number): void {
    if ( (dir < 0 && this.currentPage === 0) || (this.currentPage >= this.pages.length)) {
      return;
    }
    this.currentPage += dir;
    this.changePage.emit(this.currentPage + 1);
  }

}
