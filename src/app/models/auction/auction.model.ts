export enum AuctionStatus {
    CREATED = "CREATED",
    PAUSED = "PAUSED",
    STARTED = "STARTED",
    ENDED = "ENDED"
}

export interface AuctionDto {
    id: number;
    name: string;
    description: string;
    startTimestamp: Date;
    duration: number;
    status: AuctionStatus;
    ownerId: number;
}