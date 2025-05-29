import { LotDto } from "../../models/lot/lot.model";
import { CrudService } from "../common/crud-service.interface";

export interface LotService extends CrudService<LotDto>{
    getLotsByAuctionId(id: number): Promise<LotDto[]>;
}