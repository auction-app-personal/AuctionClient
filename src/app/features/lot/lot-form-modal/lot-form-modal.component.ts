import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lot-form-modal',
  standalone: true,
  imports: [],
  templateUrl: './lot-form-modal.component.html',
  styleUrl: './lot-form-modal.component.scss'
})
export class LotFormModalComponent {
@Input({required: true})
auctionId!: number;
}
