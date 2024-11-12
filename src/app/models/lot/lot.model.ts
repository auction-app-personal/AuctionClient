export interface LotDto {
    id: number;
    name: string;
    description: string;
    startPrice: number;
    status: LotStatus;
    auctionId: number;
}

export enum LotStatus {
    CLOSED = "CLOSED",
    OPENED = "OPENED",
    SOLD = "SOLD"
}