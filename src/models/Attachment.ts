
import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import Poll from "./Poll";
import { Post } from ".";
@Entity()
export default class Attachment extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number
    @OneToOne(type=> Post)
    @JoinColumn()
    post: Post
    type: string
    name: string
    url: string
}