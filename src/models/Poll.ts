
import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import Post from "./Post";
@Entity()
export default class Poll extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => Post, post => post.polls)
    post: Post;

    @Column()
    option: string
}