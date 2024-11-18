import { Component, Input } from '@angular/core';
import { LotDto } from '../../../../models/lot/lot.model';

@Component({
  selector: 'app-lot-item',
  standalone: true,
  imports: [],
  templateUrl: './lot-item.component.html',
  styleUrl: './lot-item.component.scss',
})
export class LotItemComponent {
  @Input({ required: true })
  lot!: LotDto;
}
