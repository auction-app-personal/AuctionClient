import { Component, Inject, Input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { Color } from '../../../../shared/enums/color.enum';
import { IconComponent } from "../../../../shared/icon/icon.component";
import { LotDto } from '../../../../models/lot/lot.model';
import { LOT_SERVICE } from '../../../../services/common/injection-tokens';
import { LotService } from '../../../../services/data/lot/lot-service.interface';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LotFormModalComponent } from "../../../lot/lot-form-modal/lot-form-modal.component";

@Component({
  selector: 'app-auction-lots',
  standalone: true,
  imports: [IconComponent, LotFormModalComponent],
  templateUrl: './auction-lots.component.html',
  styleUrl: './auction-lots.component.scss'
})
export class AuctionLotsComponent implements OnInit, OnChanges{
  @Input({ required: true })
  auctionId: number = 0;
  
  private subscriptions: Subscription = new Subscription();
  lots = signal<LotDto[]>([]);
  isModalVisible = false;

  Color = Color;
  
  constructor(@Inject(LOT_SERVICE) private lotService: LotService,
                private router: Router){
      
  }

  ngOnInit(): void {
    this.loadLots();
  }

  ngOnChanges(): void {
    this.ngOnInit()
  }

  onLotDelete(lotId: number): void {
    this.lotService.delete(lotId).subscribe(
      {
        complete: () => {
          this.loadLots();
        }
      }
    )
  }

  openAuctionModal(): void {
    document.body.classList.add('modal-open');
	  this.isModalVisible = true;
  }

  hideAuctionModal() {
    document.body.classList.remove('modal-open');
	  this.isModalVisible = false;
  }

  editLot(lotId: number): void {
    this.router.navigate(['/lots/edit/', lotId]);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadLots(){
    this.subscriptions.add(this.lotService.getLotsByAuctionId(this.auctionId!).subscribe(
      (lots) => this.lots.set(lots)
    ));
  }

}
