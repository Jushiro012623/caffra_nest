import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableUnique,
} from 'typeorm';

export class ProductCategories1773736007897 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product_categories',
        columns: [
          { name: 'product_id', type: 'bigint', isNullable: false },
          { name: 'category_id', type: 'bigint', isNullable: false },
        ],
        uniques: [
          new TableUnique({
            name: 'UQ_PRODUCT_CATEGORY',
            columnNames: ['category_id', 'product_id'],
          }),
        ],
      }),
      true,
    );

    await queryRunner.createForeignKeys('product_categories', [
      new TableForeignKey({
        columnNames: ['product_id'],
        referencedTableName: 'products',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['category_id'],
        referencedTableName: 'categories',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('product_categories');

    if (table) {
      await queryRunner.dropForeignKeys(
        'product_categories',
        table.foreignKeys,
      );
    }
    await queryRunner.dropTable('product_categories', true);
  }
}
