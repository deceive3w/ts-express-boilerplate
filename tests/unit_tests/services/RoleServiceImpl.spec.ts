import { Container } from "inversify";
import { mock } from 'jest-mock-extended';
import { Repository } from "../../../src/interfaces";
import { RoleServiceImpl } from '../../../src/services'
import { Role, User } from "../../../src/models";
import { ACTION } from "../../../src/types";

describe('Testing Role Service', ()=>{
    let container: Container
    beforeAll(()=>{
        const mockRepository = mock<Repository<Role>>();
        mockRepository.create.mockResolvedValue({_id: "0",name:"admin"})
        mockRepository.find.mockResolvedValue([{_id: "0",name:"admin"}])
        container = new Container()
        container.bind<Repository<Role>>('RoleRepository').toConstantValue(mockRepository)
        container.bind<RoleServiceImpl>('RoleService').to(RoleServiceImpl)
    })

    test('it should can create role',async()=>{
        let role = await container.get<RoleServiceImpl>("RoleService").createRole({_id: "0",name:"admin"})
        expect(role).toStrictEqual({_id: "0",name:"admin"})
    })

    test('it should can find role', async ()=>{
        let role = await container.get<RoleServiceImpl>("RoleService").find()
        expect(role).toStrictEqual([{_id: "0",name:"admin"}])
    })
})