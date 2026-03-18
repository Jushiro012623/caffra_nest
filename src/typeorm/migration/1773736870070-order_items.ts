import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableUnique} from "typeorm";

export class OrderItems1773736870070 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'order_items',
            columns: [
                {name: 'order_id', type: 'bigint', isNullable: false},
                {name: 'product_id', type: 'bigint', isNullable: false},
                {name: "quantity", type: 'int', isNullable: false},
                {name: "price", type: 'float', isNullable: false},
                {name: "subtotal", type: 'float', isNullable: false},
            ],
            uniques: [
                new TableUnique({
                    name: 'UQ_ORDER_ITEM',
                    columnNames: ['order_id', 'product_id'],
                }),
            ],
        }), true)

        await queryRunner.createForeignKeys('order_items', [
            new TableForeignKey({
                columnNames: ['product_id'],
                referencedTableName: 'products',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
            new TableForeignKey({
                columnNames: ['order_id'],
                referencedTableName: 'orders',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            })
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('order_items');

        if (table) {
            await queryRunner.dropForeignKeys('order_items', table.foreignKeys);
        }
        await queryRunner.dropTable('order_items', true);
    }

}
