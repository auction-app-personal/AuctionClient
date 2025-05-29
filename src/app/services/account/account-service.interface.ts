import { AccountDto } from "../../models/account/account.model";
import { CrudService } from "../common/crud-service.interface";

export interface AccountService extends CrudService<AccountDto> {


}