import CrudRepository from './CrudRepository';
import { RoleModel, Role } from '../models';

export default class RoleRepository extends CrudRepository<Role>{
    model = RoleModel
}