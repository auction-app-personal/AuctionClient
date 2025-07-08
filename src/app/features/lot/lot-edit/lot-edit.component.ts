import { Component, Inject } from '@angular/core';
import { LotFormModalComponent } from "../lot-form-modal/lot-form-modal.component";
import { Color } from '../../../shared/enums/color.enum';
import { LotDto } from '../../../models/lot/lot.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LotService } from '../../../services/data/lot/lot-service.interface';
import { AUCTION_FACADE, LOT_SERVICE } from '../../../services/common/injection-tokens';
import { AuctionFacadeService } from '../../../services/shared/auction-facade.service';
import { Location } from '@angular/common';
import { IconComponent } from "../../../shared/icon/icon.component";
import { LotImagesComponent } from "./lot-images/lot-images.component";

@Component({
  selector: 'app-lot-edit',
  standalone: true,
  imports: [LotFormModalComponent, IconComponent, LotImagesComponent],
  templateUrl: './lot-edit.component.html',
  styleUrl: './lot-edit.component.scss'
})
export class LotEditComponent {
  Color = Color;

  lot: LotDto | null = null;

  paricipants: number = 0;
  totalCollected: number = 0;
  timeRemaining: Date = new Date();

  private subscriptions: Subscription = new Subscription();
  isModalVisible: boolean = false;

  constructor(
    @Inject(LOT_SERVICE) private lotService: LotService,
    @Inject(AUCTION_FACADE) private auctionFacade: AuctionFacadeService,
    private route: ActivatedRoute,
    private location: Location
  )  {
    
  }
  ngOnInit(): void {
    const routeSubscription = this.route.paramMap.subscribe((params) => {
      const idVal = params.get('id');
      if (idVal) {
        this.lotService.getById(parseInt(idVal)).subscribe(
          lot => {
            this.lot = lot;
          }
        )
      }
    });
    this.subscriptions.add(routeSubscription);
  }

  reloadLot() {
    if(!this.lot) return;
    
    this.lotService.getById(this.lot?.id).subscribe(
      lot => {
        this.lot = lot;
      }
    )
  }

  hideLotModal() {
    document.body.classList.remove('modal-open');
    this.isModalVisible = false;
  }

  openLotModal() {
    document.body.classList.add('modal-open');
    this.isModalVisible = true;
  }

  // changelotStatus(status: lotStatus){
  //   if(!this.lot) return;
  //   this.lot.status = status;
  //   this.lotService.update(this.lot.id, this.lot).subscribe(
  //     (newVal) => this.lot = newVal
  //   )
  // }

  deleteLot() {
    if(!this.lot) return;
    this.lotService.delete(this.lot.id).subscribe(
      {
      complete: () => {
        this.location.back();
      }
    }
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
