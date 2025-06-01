import { Component, Input } from '@angular/core';
import { LotDto } from '../../../models/lot/lot.model';
import { LotItemComponent } from './lot-item/lot-item.component';

@Component({
  selector: 'app-lot-carousel-single',
  standalone: true,
  imports: [LotItemComponent],
  templateUrl: './lot-carousel-single.component.html',
  styleUrl: './lot-carousel-single.component.scss',
})
export class LotCarouselSingleComponent {
  @Input({ required: true })
  lots!: LotDto[] | null;
  currentLot: number = 0;

  scrollRight() {
    if (!this.lots) return;
    if (this.currentLot < this.lots.length - 1) this.currentLot++;
    else this.currentLot = 0;
  }
  scrollLeft() {
    if (this.currentLot > 0) this.currentLot--
    else this.currentLot = this.lots!.length - 1;
  }
}
