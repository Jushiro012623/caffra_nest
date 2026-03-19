import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class UserRole1773889270679 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user_roles',
                columns: [
                    {name: 'user_id', type: 'bigint', isPrimary: true},
                    {name: 'role_id', type: 'bigint', isPrimary: true},
                    {name: 'created_at', type: 'datetime', default: 'CURRENT_TIMESTAMP'},
                    {name: 'updated_at', type: 'datetime', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'},
                ]
            })
        )

        await queryRunner.createForeignKeys('user_roles', [
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
            new TableForeignKey({
                columnNames: ['role_id'],
                referencedTableName: 'roles',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            })
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('user_roles')
        if (table) {
            await queryRunner.dropForeignKeys('user_roles', table.foreignKeys);
        }
        await queryRunner.dropTable('user_roles', true);
    }

}
