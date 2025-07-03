export enum AuctionStatus {
    CREATED = "CREATED",
    PAUSED = "PAUSED",
    STARTED = "STARTED",
    ENDED = "ENDED"
}

export const AuctionStatusHelpers = {
  isActive: (auction: AuctionDto) => auction.status === AuctionStatus.STARTED,
  isPaused: (auction: AuctionDto) => auction.status === AuctionStatus.PAUSED,
  isCreated: (auction: AuctionDto) => auction.status === AuctionStatus.CREATED,
  isEnded: (auction: AuctionDto) => auction.status === AuctionStatus.ENDED,
};

export interface AuctionDto {
    id: number;
    name: string;
    description: string;
    startTimestamp: Date;
    duration: number;
    status: AuctionStatus;
    ownerId: number;
}