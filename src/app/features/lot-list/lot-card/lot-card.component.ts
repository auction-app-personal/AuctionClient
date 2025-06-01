import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LotDto } from '../../../models/lot/lot.model';

@Component({
  selector: 'app-lot-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './lot-card.component.html',
  styleUrl: './lot-card.component.scss'
})
export class LotCardComponent {
  @Input({required: true})
  lot!: LotDto;

}
