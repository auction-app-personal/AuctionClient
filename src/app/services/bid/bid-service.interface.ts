import { Observable } from "rxjs";
import { BidDto } from "../../models/bid/bid.model";
import { CrudService } from "../common/crud-service.interface";

export interface BidService extends CrudService<BidDto> {
    getBidsByLotId(id: number): Observable<BidDto[]>;

}