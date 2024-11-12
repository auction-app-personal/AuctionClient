import { Component, Input } from '@angular/core';
import { LotDto } from '../../../../models/lot/lot.model';

@Component({
  selector: 'app-lot-card',
  standalone: true,
  imports: [],
  templateUrl: './lot-card.component.html',
  styleUrl: './lot-card.component.scss'
})
export class LotCardComponent {
  @Input({required: true})
  lot!: LotDto;
}
