import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Products1773735371031 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'products',
            columns: [
                {name: 'id', isPrimary: true, type: 'bigint', generationStrategy: 'increment', isGenerated: true},
                {name: 'name', type: 'varchar', isNullable: false, isUnique: true},
                {name: 'description', type: 'varchar', isNullable: false},
                {name: 'price', type: 'float', isNullable: false},
                {name: 'created_at', type: 'datetime', default: 'CURRENT_TIMESTAMP'},
                {name: 'updated_at', type: 'datetime', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'},
                {name: 'deleted_at', type: 'datetime', default: null, isNullable: true},
            ],
            indices: [
                {name: "PRODUCTS_NAME", columnNames: ['name']},
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products', true);
    }

}
