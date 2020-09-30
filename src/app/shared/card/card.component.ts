import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor() { }
  @Input() thumbnail;
  @Input() title;
  @Input() url;
  @Input() comicAmount;
  @Input() description;
  ngOnInit(): void {
    console.log("thumbnail", this.thumbnail)
  }

}
