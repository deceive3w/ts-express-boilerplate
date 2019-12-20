
import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import Poll from "./Poll";
@Entity()
export default class Post extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    text: string

    @Column()
    userId: number

    @OneToMany(type => Poll, poll => poll.post)
    polls: Poll[];
}