import CrudRepository from './CrudRepository';
import { UserModel, User } from '../models';

export default class UserRepository extends CrudRepository<User>{
    model = UserModel
}