
import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne, Double} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import Poll from "./Poll";
import Post from "./Post";
import { Type } from "class-transformer";
import Prediction from "./Prediction";
@Entity()
export default class UserPredict extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(type=> Prediction)
    @JoinColumn()
    prediction: Prediction

    @Column()
    userId: number

    @Column()
    side: number
}