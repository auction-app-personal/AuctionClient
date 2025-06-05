import { AccountDto } from "../../../models/account/account.model";
import { CrudService } from "../../common/crud-service.interface";

export interface AccountService extends CrudService<AccountDto> {
  loginUser(username: string, password: string): { user: AccountDto | null; token: string; };
  registerUser(username: string, password: string): number;


}