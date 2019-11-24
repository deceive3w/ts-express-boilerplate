import mongoose, { Document, Model, model, DocumentQuery } from 'mongoose'
import { injectable, inject, decorate } from 'inversify';
import { Repository } from '../types';
import CrudRepository from '../implementation/CrudRepository';
import { UserModel, User } from '../models';
import UserService from '../services/UserService';


export default class UserRepository extends CrudRepository<User>{
    model = UserModel
}