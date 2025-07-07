import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LotDto, LotStatus } from '../../../models/lot/lot.model';
import { LOT_SERVICE } from '../../../services/common/injection-tokens';
import { LotService } from '../../../services/data/lot/lot-service.interface';

@Component({
  selector: 'app-lot-form-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './lot-form-modal.component.html',
  styleUrl: './lot-form-modal.component.scss'
})
export class LotFormModalComponent implements OnInit {

  @Input({required: true}) auctionId!: number;
  @Input({required: false}) lot: LotDto | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();


  lotForm!: FormGroup;

  constructor(@Inject(LOT_SERVICE) private lotService: LotService,
              private fb: FormBuilder){

  }

  ngOnInit(): void {
    this.lotForm = this.fb.group({
      name: [this.lot?.name ?? '', Validators.required],
      description: [this.lot?.description ?? ''],
      startPrice: [this.lot?.startPrice ?? 0],
    });
  }

  saveLot(): void {
    this.lotService.save({
      id: this.lot?.id ?? 0,
      name: this.lotForm.get("name")?.value,
      description: this.lotForm.get("description")?.value,
      auctionId: this.lot?.auctionId ?? this.auctionId,
      startPrice: this.lotForm.get("startPrice")?.value,
      status: this.lot?.status ?? LotStatus.AWAITING_AUCTION
    }).subscribe(
      (value) => {
        if(value.id === 0){
          console.log('fail')
          return;
        }
        this.save.emit();
        this.close.emit();
      }
    );
  }

  closeModal(): void {
    this.close.emit();
  }
}
