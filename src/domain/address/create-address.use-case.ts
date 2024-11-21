import { Service } from "typedi"
import { AddressDbDatasource } from "../../data/user/address-db-datasource";
import { AddressInputModel } from "../model/address-model";
import { UserDbDataSource } from "../../data/user/user-db-datasource";
import { UserNotFoundError } from "../../core/error/user-not-found-error";

@Service()
export class CreateAddressUseCase {
    constructor(
        private readonly addressDatasource: AddressDbDatasource,
        private readonly userDatasource: UserDbDataSource,
    ) {}

    async exec(input: AddressInputModel) {
        const user = await this.userDatasource.findById(input.userId)

        if (!user) {
            throw new UserNotFoundError()
        }

        return this.addressDatasource.create(input)
    }
}