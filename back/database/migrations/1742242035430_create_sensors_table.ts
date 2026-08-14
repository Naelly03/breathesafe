import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sensors'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('model').notNullable()
      table.boolean('status').notNullable().defaultTo(false)
      table.date('installation_date').nullable()
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users')
      
      table.timestamp('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}