import { Privilege } from "../models";


export default interface PrivilegeService {
    createPrivilege(Privilege: Privilege): Promise<Privilege>
    updatePrivilege(_id: string, data: Privilege): Promise<Privilege>
    find(param?: Privilege): Promise<Privilege[]>
    findById(_id: string): Promise<Privilege>
}