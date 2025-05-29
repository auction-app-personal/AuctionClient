import { Component, Input } from '@angular/core';
import { LotDto } from '../../../models/lot/lot.model';
import { LotItemExpandableComponent } from "./lot-item-expandable/lot-item-expandable.component";

@Component({
  selector: 'app-lot-table',
  standalone: true,
  imports: [LotItemExpandableComponent],
  templateUrl: './lot-table.component.html',
  styleUrl: './lot-table.component.scss',
})
export class LotTableComponent {
  @Input({ required: true })
  lots!: LotDto[] | null;
}
