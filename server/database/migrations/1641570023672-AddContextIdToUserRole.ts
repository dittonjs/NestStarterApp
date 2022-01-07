import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddContextIdToUserRole1641570023672 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user_role',
      new TableColumn({
        name: 'contextId',
        type: 'text',
        default: "'root'", // default values must include single quotes for text
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user_role', 'contextId');
  }
}
