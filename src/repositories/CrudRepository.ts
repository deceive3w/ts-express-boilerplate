import { Repository } from "../interfaces";
import { Model, Query, Document, DocumentQuery } from "mongoose";
import { injectable, decorate, unmanaged } from "inversify";

decorate(injectable(), Model)
@injectable()
export default class CrudRepository<M> implements Repository<M>{
    model: Model<any>
    constructor(@unmanaged() model: Model<any>){
        this.model = model
    }
    create(data: M): Promise<M> {
        return this.model.create(data)
    }
    update(condition: M, data: M): Promise<{updatedCount?: number}> {
        return new Promise((resolve, reject)=>{
            this.model.update(condition, data).then((res)=>{
                resolve({
                    updatedCount: res.ok
                })
            }).catch((e)=>{
                reject(e)
            })
        })
    }
    delete(condition: M): Promise<{deletedCount?: number}> {
        return new Promise((resolve, reject)=>{
            this.model.deleteOne(condition).then((res)=>{
                resolve({
                    deletedCount: res.deletedCount
                })
            }).catch((err)=>{
                reject(err)
            })
        })
    }
    find(param?: M): DocumentQuery<M[], null, {}>{
        return this.model.find(param)
    }
    findById(id: string):DocumentQuery<M, null, {}> {
        return this.model.findById(id)
    }
}