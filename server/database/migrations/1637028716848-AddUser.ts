import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddUser1637028716848 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'firstName',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'lastName',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'passwordHash',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'text',
            isNullable: false,
            isUnique: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
