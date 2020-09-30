import { Component, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { HTTPStatus } from 'src/app/shared/http.interceptor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements AfterContentChecked {
  title = 'Comics Catalog from Marvel API';

  HTTPActivity: boolean;

  constructor(private httpStatus: HTTPStatus,  private cdr: ChangeDetectorRef,){
    this.httpStatus.getHttpStatus().subscribe((status: boolean) => {
      console.log("aqui", status)
      this.HTTPActivity = status;
    });
    
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }
}
