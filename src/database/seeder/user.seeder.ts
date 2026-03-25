import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { EntityManager } from 'typeorm';

@Injectable()
export class UserSeeder implements Seeder {
  constructor(private readonly entityManager: EntityManager) {}

  async seed(): Promise<void> {
    // const now: Date = new Date();

    // const roleData = [
    //   {
    //     name: 'Admin',
    //     slug: 'admin',
    //     created_at: now,
    //     updated_at: now,
    //   },
    //   {
    //     name: 'Cashier',
    //     slug: 'cashier',
    //     created_at: now,
    //     updated_at: now,
    //   },
    // ];

    const userData = {
      username: 'dshivan',
      password: 'password',
      email: 'dshivan@example.com',
      mobile_number: '09125279754',
    };

    await this.entityManager.transaction(
      async (manager: EntityManager): Promise<void> => {
        // const roleRepo = manager.getRepository('roles');
        const userRepo = manager.getRepository('users');

        // const roles = roleRepo.create(roleData);
        // await manager.save(roles);

        const user = userRepo.create(userData);

        // user.roles = roles;

        await manager.save(user);
      },
    );
  }

  async drop(): Promise<void> {
    await this.entityManager.getRepository('users').deleteAll();
  }
}
