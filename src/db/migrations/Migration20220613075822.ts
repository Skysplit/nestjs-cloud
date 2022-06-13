import { Migration } from '@mikro-orm/migrations';

export class Migration20220613075822 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "users" ("id" serial primary key, "email" varchar(255) not null, "external_id" varchar(255) not null);',
    );
    this.addSql(
      'alter table "users" add constraint "users_email_unique" unique ("email");',
    );
    this.addSql(
      'alter table "users" add constraint "users_external_id_unique" unique ("external_id");',
    );

    this.addSql(
      'create table "todos" ("id" serial primary key, "name" varchar(255) not null, "description" text not null, "completed" boolean not null, "user_id" int not null);',
    );
    this.addSql(
      'alter table "todos" add constraint "todos_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;',
    );

    this.addSql('alter table "users" enable row level security');
    this.addSql('alter table "todos" enable row level security');
  }
}
