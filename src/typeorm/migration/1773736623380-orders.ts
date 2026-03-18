import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class Orders1773736623380 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'orders',
            columns: [
                {name: 'id', isPrimary: true, type: 'bigint', generationStrategy: 'increment', isGenerated: true},
                {name: 'user_id', type: 'bigint', isNullable: false},
                {name: 'total_amount', type: 'float', isNullable: false},
                {name: 'customer_name', type: 'varchar', isNullable: true},
                {
                    name: 'status',
                    type: 'tinyint',
                    isNullable: false,
                    default: 1,
                    comment: "1:PENDING, 2:PAID, 3:CANCELLED"
                },
                {name: 'created_at', type: 'datetime', default: 'CURRENT_TIMESTAMP'},
                {name: 'updated_at', type: 'datetime', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'},
                {name: 'deleted_at', type: 'datetime', default: null, isNullable: true},
            ]
        }), true)

        await queryRunner.createForeignKey('orders',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: "CASCADE"
            }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("orders")

        if(table){
            await queryRunner.dropForeignKeys('orders', table.foreignKeys)
        }

        await queryRunner.dropTable('orders', true);
    }

}
