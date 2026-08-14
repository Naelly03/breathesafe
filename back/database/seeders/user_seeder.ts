import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        name: "User4",
        email: "user4@gmail.com",
        password: "user123",
      },
      {
        name: "NaellyV",
        email: "naellyv@gmail.com",
        password: "naellys123",
      }
    ])
  }
}