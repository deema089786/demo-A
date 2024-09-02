import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  UserEntity,
  UserProfileEntity,
  User,
} from '@demo-A/api-types';
import { Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

import {
  UsersRepositoryCreateUserPayload,
  UsersRepositoryUpdateUserProfilePayload,
} from './users.repository.types';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(UserProfileEntity)
    private userProfilesRepository: Repository<UserProfileEntity>,
  ) {}

  async getUserById(
    userId: string,
    options: { relations?: FindOneOptions<User>['relations'] } = {},
  ): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: options.relations,
    });
    if (!user) return null;
    return user;
  }

  async getUserBy(
    where: FindOneOptions<User>['where'],
    options: { relations?: FindOneOptions<User>['relations'] } = {},
  ): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where,
      relations: options.relations,
    });
    if (!user) return null;
    return user;
  }

  async createUser(payload: UsersRepositoryCreateUserPayload): Promise<User> {
    const user = new UserEntity();
    user.phoneNumber = payload.phoneNumber || null;
    user.email = payload.email || null;
    await this.usersRepository.save(user);

    const userProfile = new UserProfileEntity();
    userProfile.userId = user.id;
    userProfile.firstName = payload.firstName || null;
    userProfile.lastName = payload.lastName || null;
    userProfile.image = payload.image || null;
    await this.userProfilesRepository.save(userProfile);

    user.profile = userProfile;
    return user;
  }

  async updateUserProfileByUserId(
    userId: string,
    payload: UsersRepositoryUpdateUserProfilePayload,
  ): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');
    await this.userProfilesRepository.update({ userId: user.id }, payload);
  }
}
