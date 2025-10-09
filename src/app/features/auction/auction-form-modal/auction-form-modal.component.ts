import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AUCTION_SERVICE } from '../../../services/common/injection-tokens';
import { AuctionService } from '../../../services/data/auction/auction-service.interface';
import { AuctionDto, AuctionStatus } from '../../../models/auction/auction.model';

@Component({
  selector: 'app-auction-form-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './auction-form-modal.component.html',
  styleUrl: './auction-form-modal.component.scss'
})
export class AuctionFormModalComponent implements OnInit {

  @Input({required: true}) accountId!: number;
  @Input({required: false}) auction: AuctionDto | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();


  auctionForm!: FormGroup;

  constructor(@Inject(AUCTION_SERVICE) private auctionService: AuctionService,
              private fb: FormBuilder){
  }

  ngOnInit(): void {    
    let localISOTime = null;

    if(this.auction?.startTimestamp)
      localISOTime = this.toDatetimeLocal(new Date(this.auction.startTimestamp));

    this.auctionForm = this.fb.group({
      name: [this.auction?.name ?? '', Validators.required],
      description: [this.auction?.description ?? ''],
      startTimestamp: [localISOTime],
      duration: [this.auction?.duration ?? null],
    });
  }

  saveAuction(): void {
    this.auctionService.save({
      id: this.auction?.id ?? 0,
      name: this.auctionForm.get("name")?.value,
      description: this.auctionForm.get("description")?.value,
      startTimestamp: this.auctionForm.get("startTimestamp")?.value,
      duration: this.auctionForm.get("duration")?.value,
      status: this.auction?.status ?? AuctionStatus.CREATED,
      ownerId: this.auction?.ownerId ?? this.accountId
    }).subscribe(
      (value) => {
        if(value.id !== 0){
          this.save.emit()
        } 
        this.close.emit();
      }
    );
  }

  closeModal(): void {
    console.log(this.auctionForm)
	  this.close.emit();
  }

  private toDatetimeLocal(date: Date): string {
    console.log(date)
    const offset = date.getTimezoneOffset();
    const local = new Date(date.getTime() - offset * 60 * 1000);
    return local.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:mm"
  }
}
