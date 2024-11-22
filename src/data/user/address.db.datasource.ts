import { Service } from 'typedi';
import { AddressInputModel, AddressModel } from '@domain/model';
import { dbClient } from '@data/db/config/db-client';


@Service()
export class AddressDbDatasource {
    create(data: AddressInputModel): Promise<AddressModel> {
        return dbClient.address.create({ data })
    }

    findByUserId(userId: string): Promise<AddressModel[]> {
        return dbClient.address.findMany({ where: { id: userId } })
    }
}