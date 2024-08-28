import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  AlbumsRequest,
  AlbumsResponse,
  toAlbumsResponse,
} from "../model/album-model";
import { AlbumsValidation } from "../validation/albums-validation";
import { Validation } from "../validation/validation";

export class AlbumsService {
  static async getAll(): Promise<any> {
    const albums = await prisma.album.findMany({});

    return albums;
  }

  static async store(request: AlbumsRequest): Promise<AlbumsResponse> {
    const requestBody: AlbumsRequest = Validation.validate(
      AlbumsValidation.AlbumRequest,
      request
    );

    const isUserExist = await prisma.users.findUnique({
      where: {
        id: requestBody.userId,
      },
    });

    if (!isUserExist) {
      throw new ErrorResponse(404, "user not found");
    }

    const [album] = await prisma.$transaction([
      prisma.album.create({
        data: {
          userId: requestBody.userId,
          title: requestBody.title,
        },
      }),
    ]);

    return toAlbumsResponse(album);
  }

  static async findByAlbumId(albumId: number): Promise<AlbumsResponse> {
    const album = await prisma.album.findUnique({
      where: {
        id: albumId,
      },
    });

    if (!album) {
      throw new ErrorResponse(404, "album not found");
    }

    return toAlbumsResponse(album);
  }

  static async updateByAlbumId(
    albumId: number,
    request: AlbumsRequest
  ): Promise<AlbumsResponse> {
    const requestBody: AlbumsRequest = Validation.validate(
      AlbumsValidation.AlbumRequest,
      request
    );

    const isAlbumExists = await prisma.album.findUnique({
      where: {
        id: albumId,
      },
    });

    if (!isAlbumExists) {
      throw new ErrorResponse(404, "album not found");
    }

    const [album] = await prisma.$transaction([
      prisma.album.update({
        where: {
          id: albumId,
        },
        data: {
          userId: requestBody.userId,
          title: requestBody.title,
        },
      }),
    ]);

    return toAlbumsResponse(album);
  }
}
