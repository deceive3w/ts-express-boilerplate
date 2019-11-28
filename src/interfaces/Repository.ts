import { DocumentQuery } from "mongoose";

export default interface Repository<M>{
    create(data:M): Promise<M>
    update(condition: M, data: M): Promise<{updatedCount?: number}>
    delete(condition: M): Promise<{deletedCount?: number}>
    find(param?: M): DocumentQuery<M[],null,{}>
    findById(id: string): DocumentQuery<M, null,{}>
}
