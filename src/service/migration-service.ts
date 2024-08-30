import axios, { AxiosResponse } from "axios";
import { prisma } from "../app/database";

export class MigrationService {
  static async migrationUsers(): Promise<AxiosResponse> {
    const users: AxiosResponse = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    await users.data.forEach((value: any) => {
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

    return users.data;
  }

  static async migrationPosts(): Promise<AxiosResponse> {
    const posts: AxiosResponse = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    const arrPost: any[] = [];

    await posts.data.forEach((element: any) => {
      arrPost.push(element);
    });

    await prisma.$transaction([
      prisma.post.createMany({
        data: arrPost,
      }),
    ]);

    return posts.data;
  }
}
