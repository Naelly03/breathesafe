import Sensor from '#models/sensor'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() { 
    await Sensor.createMany([
      {
        model: 'ENS160',
        status: false,
        installation_date: new Date(2025, 3, 17),
        userId: 1
      },
      {
        model: 'MQ-9',
        status: true,
        installation_date: new Date(2025, 2, 21),
        userId: 2
      },
    ])
  }
}