import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'readings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.decimal('co_concentration').notNullable()
      table.string('co_level').notNullable()
      table.datetime('date_hour').notNullable()
      table.integer('sensor_id').notNullable().unsigned().references('id').inTable('sensors')
      
      table.timestamp('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}