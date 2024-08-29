import axios from "axios";
import { any } from "zod";
import { prisma } from "../app/database";
import { create } from "domain";

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
            address: {
              create: {
                street: value.address.street,
                city: value.address.city,
                suite: value.address.suite,
                zipcode: value.address.zipcode,
                geo: {
                  create: {
                    lat: value.address.geo.lat,
                    lng: value.address.geo.lng,
                  },
                },
              },
            },
            company: {
              create: {
                name: value.company.name,
                catchPhrase: value.company.catchPhrase,
                bs: value.company.bs,
              },
            },
          },
        }),
      ]);
    });

    return migrateUsersApiToDb;
  }
}
