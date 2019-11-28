import CrudRepository from './CrudRepository';
import { PrivilegeModel, Privilege } from '../models';

export default class PrivilegeRepository extends CrudRepository<Privilege>{
    model = PrivilegeModel
}