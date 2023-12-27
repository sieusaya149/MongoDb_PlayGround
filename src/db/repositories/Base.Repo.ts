import { Db, Collection, InsertOneResult,
    InsertManyResult, ObjectId} from 'mongodb';
import { Database } from "../index";

export class BaseRepo<T> {
    protected collection!: Collection;
    protected db: Db | undefined = Database.getInstance().getDb()
    constructor() {}
    protected setCollection(collectionName: string): Collection | null
    {
        if(!this.db)
        {
            console.log("db is not connected")
            return null
        }
        return this.collection = this.db.collection(collectionName)
    }
    public async create(newData: object): Promise<InsertOneResult<any>> {
        const result = await this.collection.insertOne(newData);
        return result;
    }

    public async find(query: Object): Promise<Array<any>> {
        const result = await this.collection.find(query).toArray();
        return result;
    }
    
    public async update(id: string, updatedData: Object): Promise<any> {
        const result = await this.collection.updateOne({ _id: new ObjectId(id) }, updatedData);
        console.log(result)
        return result
    }
    
    public async delete(id: string): Promise<any> {
        const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
        return result
    }

    public async insertMany(newDatas: Array<any>): Promise<InsertManyResult<any>> {
        const result = this.collection.insertMany(newDatas);
        return result;
    }
}