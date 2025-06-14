import { Observable } from "rxjs";
import { AccountAuctionDto } from "../../../models/account-auction/account-auction.model";
import { CrudService } from "../../common/crud-service.interface";

export interface AccountAuctionService extends CrudService<AccountAuctionDto> {
    deleteByKeys(accountId: number, auctionId: number): Observable<void>;
}