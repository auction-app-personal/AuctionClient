import { Component, Input } from '@angular/core';
import { LotDto } from '../../../../models/lot/lot.model';
import { LotCardComponent } from "../../lot-preview/lot-card/lot-card.component";

@Component({
  selector: 'app-lot-item-expandable',
  standalone: true,
  imports: [],
  templateUrl: './lot-item-expandable.component.html',
  styleUrl: './lot-item-expandable.component.scss',
})
export class LotItemExpandableComponent {
  @Input({ required: true })
  lot!: LotDto;
}
