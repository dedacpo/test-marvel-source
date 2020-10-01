import { Component, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { HTTPStatus } from 'src/app/shared/http.interceptor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentChecked {
  title = 'Comics Catalog from Marvel API';

  clientHeight: number;

  HTTPActivity: boolean;

  constructor(private httpStatus: HTTPStatus, private cdr: ChangeDetectorRef, ) {
    this.clientHeight = window.innerHeight;
    this.httpStatus.getHttpStatus().subscribe((status: boolean) => {
      this.HTTPActivity = status;
    });

  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  onResized() {
    this.clientHeight = window.innerHeight;
  }

  onActivate() {
    window.scroll(0, 0);
  }
}
