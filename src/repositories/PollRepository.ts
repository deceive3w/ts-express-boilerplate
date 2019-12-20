import { EntityRepository, Repository } from "typeorm";
import { Poll, } from "../models";

@EntityRepository(Poll)
export class PollRepository extends Repository<Poll> {

}