import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Role1773816965911 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'roles',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar', isNullable: false, isUnique: true },
          { name: 'slug', type: 'varchar', isNullable: false, isUnique: true },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'deleted_at',
            type: 'datetime',
            default: null,
            isNullable: true,
          },
        ],
        indices: [
          { name: 'ROLES_NAME', columnNames: ['name'] },
          { name: 'ROLES_SLUG', columnNames: ['slug'] },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('roles', true);
  }
}
