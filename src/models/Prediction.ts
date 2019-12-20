
import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne, Double} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import Poll from "./Poll";
import Post from "./Post";
import { Type } from "class-transformer";
@Entity()
export default class Prediction extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    coinId: number

    @OneToOne(type => Post)
    @JoinColumn()
    post: Post
    
    @Column()
    target: number

    @Type(() => Date)
    timing: Date;

    @Column()
    side: number

    getSide(){
        if(this.side == 1) {
            return "Bullish"
        }else{
            return "Bearish"
        }
    }
}