import { Service } from 'typedi';
import { UserNotFoundError } from '@core/error';
import { AddressDbDatasource } from '@data/user/address-db-datasource';
import { UserDbDataSource } from '@data/user/user-db-datasource';

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