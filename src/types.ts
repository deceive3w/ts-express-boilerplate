import { Query, DocumentQuery, Document } from "mongoose";


export interface Repository<M>{
    create(data:M): Promise<M>
    update(condition: M, data: M): Promise<{updatedCount?: number}>
    delete(condition: M): Promise<{deletedCount?: number}>
    find(param?: M): Promise<M[] | []>
    findById(id: string): Promise<M | null>
}