import { Container } from "inversify";
import { mock } from 'jest-mock-extended';
import { Repository } from "../../../src/interfaces";
import { RoleServiceImpl } from '../../../src/services'
import { Role, User } from "../../../src/models";
import RoleRepository from "../../../src/repositories/RoleRepository";
describe('Testing Role Service', ()=>{
    let container: Container
    beforeAll(()=>{
        const mockRepository = mock<Repository<Role>>();
        mockRepository.create.mockResolvedValue({_id: "0",name:"admin", permissions:['create','update', 'delete', 'find','findById']})
        mockRepository.find.mockResolvedValue([{_id: "0",name:"admin", permissions:['create','update', 'delete', 'find','findById']}])
        container = new Container()
        container.bind<Repository<Role>>('RoleRepository').toConstantValue(mockRepository)
        container.bind<RoleServiceImpl>('RoleService').to(RoleServiceImpl)
    })

    test('it should can create role',async()=>{
        let role = await container.get<RoleServiceImpl>("RoleService").createRole({
            name:"admin",
            permissions:['create','update', 'delete','find','findById']
        })
        expect(role).toStrictEqual({_id: "0",name:"admin", permissions:['create','update', 'delete', 'find','findById']})
    })

    test('it should can find role', async ()=>{
        let role = await container.get<RoleServiceImpl>("RoleService").find()
        expect(role).toStrictEqual([{_id: "0",name:"admin", permissions:['create','update', 'delete', 'find','findById']}])
    })
})