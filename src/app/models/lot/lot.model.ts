export enum LotStatus {
  SOLD = 'SOLD',                                 // Lot is already sold
  AWAITING_AUCTION = 'AWAITING_AUCTION',         // Lot is active, but its auction hasn't started
  CURRENTLY_AUCTIONED = 'CURRENTLY_AUCTIONED',   // Lot is part of an active/live auction
}

export interface LotDto {
    id: number;
    name: string;
    description: string;
    startPrice: number;
    status: LotStatus;
    auctionId: number;
}