import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LotDto } from '../../../models/lot/lot.model';
import { LotCardComponent } from './lot-card/lot-card.component';

@Component({
  selector: 'app-lot-preview',
  standalone: true,
  imports: [LotCardComponent],
  templateUrl: './lot-preview.component.html',
  styleUrl: './lot-preview.component.scss',
})
export class LotPreviewComponent {
  @Input({ required: true })
  lots!: LotDto[];
  @ViewChild('scroll')
  scroll!: ElementRef;

  scrollLeft(){
    this.scroll.nativeElement.scrollBy(-350, 0);
  }

  scrollRight(){
    this.scroll.nativeElement.scrollBy(350, 0);
  }
}
