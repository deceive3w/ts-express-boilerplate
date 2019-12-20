
import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from "typeorm";
import { BaseEntity } from "./BaseEntity";
@Entity()
export default class Follow extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    userId: number
    @Column()
    following: number
}