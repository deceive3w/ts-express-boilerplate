
import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from "typeorm";
import { BaseEntity } from "./BaseEntity";
@Entity()
export default class UserReputation extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    reputating: number
    @Column()
    userId: number
}