import { Service } from "typedi";
import { AddressDbDatasource } from "../../data/user/address-db-datasource";
import { UserDbDataSource } from "../../data/user/user-db-datasource";
import { UserNotFoundError } from "../../core/error/user-not-found-error";

@Service()
export class FindAddressByUserIdUseCase {
    constructor(
        private readonly addressDatasource: AddressDbDatasource,
        private readonly userDatasource: UserDbDataSource,
    ) {}

    async exec(input: string) {
        const user = this.userDatasource.findById(input)

        if (!user) {
            throw new UserNotFoundError()
        }

        return this.addressDatasource.findByUserId(input)
    }
}