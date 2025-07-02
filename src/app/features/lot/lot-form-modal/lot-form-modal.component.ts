import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LotStatus } from '../../../models/lot/lot.model';
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
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();


  lotForm!: FormGroup;
  lotName!: FormControl;
  lotDescr!: FormControl;
  lotStartPrice!: FormControl;

  constructor(@Inject(LOT_SERVICE) private lotService: LotService){

  }

  ngOnInit(): void {
    this.lotForm = new FormGroup({
      name: new FormControl(this.lotName, [Validators.required]),
      description: new FormControl(this.lotDescr),
      startPrice: new FormControl(this.lotStartPrice),
    });
  }

  saveLot(): void {
    this.lotService.create({
      id: 0,
      name: this.lotForm.value["name"],
      description: this.lotForm.value["description"],
      auctionId: this.auctionId,
      startPrice: this.lotForm.value["startPrice"],
      status: LotStatus.AWAITING_AUCTION
    }).subscribe(
      (value) => {
        if(value.id === 0){
          console.log('fail')
        } else {
          this.save.emit()
          this.close.emit();
        }
      }
    );
  }

  closeModal(): void {
    this.close.emit();
  }
}
