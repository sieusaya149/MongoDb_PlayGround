import { ObjectId } from 'mongodb';
import { BaseRepo } from '../../db/repositories/Base.Repo';

export class BaseService<T extends BaseRepo<T>> {
    protected repository: T;

    constructor(repository: T) {
        this.repository = repository
    }
}