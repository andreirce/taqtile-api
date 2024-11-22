import { Service } from 'typedi'
import { UserNotFoundError } from '@core/error'
import { AddressDbDatasource } from '@data/user/address.db.datasource'
import { UserDbDataSource } from '@data/user/user.db.datasource'
import { AddressInputModel, AddressModel } from '@domain/model'


@Service()
export class CreateAddressUseCase {
    constructor(
        private readonly addressDatasource: AddressDbDatasource,
        private readonly userDatasource: UserDbDataSource,
    ) {}

    async exec(input: AddressInputModel): Promise<AddressModel> {
        const user = await this.userDatasource.findById(input.userId)

        if (!user) {
            throw new UserNotFoundError()
        }

        return this.addressDatasource.create(input)
    }
}