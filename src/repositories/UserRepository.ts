// src/repositories/UserRepository.ts
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/User';
import { PostgresDataSource } from '../config/database';

export const UserRepository = PostgresDataSource.getRepository(User).extend({
    findByName(firstName: string, lastName: string) {
        return this.createQueryBuilder("user")
            .where("user.firstName = :firstName", { firstName })
            .andWhere("user.lastName = :lastName", { lastName })
            .getMany()
    },
})
