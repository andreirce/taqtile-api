import { Service } from 'typedi';
import { AddressInputModel } from '@domain/model';
import { dbClient } from '@data/db/config/db-client';


@Service()
export class AddressDbDatasource {
    create(data: AddressInputModel) {
        return dbClient.address.create({ data })
    }

    findByUserId(userId: string) {
        return dbClient.user.findUnique({ where: { id: userId } })
    }
}