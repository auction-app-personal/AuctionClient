import { AuctionDto } from "../../../models/auction/auction.model";
import { CrudService } from "../../common/crud-service.interface";

export interface AuctionService extends CrudService<AuctionDto> {


}