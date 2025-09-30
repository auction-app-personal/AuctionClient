import { Component, Input } from '@angular/core';
import { LotDto } from '../../../models/lot/lot.model';
import { LotItemExpandableComponent } from "./lot-item-expandable/lot-item-expandable.component";
import { BidFormModalComponent } from "./../bid-form-modal/bid-form-modal.component";

@Component({
  selector: 'app-lot-table',
  standalone: true,
  imports: [
    LotItemExpandableComponent,
    BidFormModalComponent
  ],
  templateUrl: './lot-table.component.html',
  styleUrl: './lot-table.component.scss',
})
export class LotTableComponent {
  @Input({ required: true })
  lots!: LotDto[] | null;
  isModalVisible: boolean = false;
  chosenLotId: number = 0;

  hideBidModal() {
    document.body.classList.remove('modal-open');
    this.isModalVisible = false;
  }
    
  openBidModal(lotId: number) {
    document.body.classList.add('modal-open');
    this.chosenLotId = lotId;
    this.isModalVisible = true;
  }
}
