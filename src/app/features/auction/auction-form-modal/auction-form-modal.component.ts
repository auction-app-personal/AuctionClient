import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-auction-form-modal',
  standalone: true,
  imports: [],
  templateUrl: './auction-form-modal.component.html',
  styleUrl: './auction-form-modal.component.scss'
})
export class AuctionFormModalComponent {
  @Output() close = new EventEmitter<void>();

  closeModal(): void {
	this.close.emit();
  }
}
