export interface BidDto {
    id: number;
    timeCreated: Date | null;
    lotId: number;
    lotName: string;
    accountId: number;
    accountName: string;
    amount: number;
    currency: string;
}