import { Role } from "../models";

export interface RoleFilterOR{
    OR: Role[]
}

export interface RoleFilterAND{
    AND: Role[]
}

export interface RoleFilter{
    hasRole: string,
    hasAuthority?: string
}