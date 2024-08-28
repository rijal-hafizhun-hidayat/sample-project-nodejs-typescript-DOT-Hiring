import axios from "axios";
import { any } from "zod";
import { prisma } from "../app/database";

export class UsersService {
  static async getAll(): Promise<any> {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response;
  }

  static async storeFromApi(): Promise<any> {
    const users = await axios.get("https://jsonplaceholder.typicode.com/users");

    const migrateUsersApiToDb = await users.data.forEach((value: any) => {
      prisma.$transaction([
        prisma.users.create({
          data: {
            name: value.name,
            username: value.username,
            email: value.email,
            phone: value.phone,
            website: value.website,
          },
        }),
      ]);
    });

    return migrateUsersApiToDb;
  }
}
