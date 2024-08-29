import axios, { AxiosResponse } from "axios";
import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  AlbumsQuery,
  AlbumsRequest,
  AlbumsResponse,
  toAlbumsResponse,
} from "../model/album-model";
import { AlbumsValidation } from "../validation/albums-validation";
import { Validation } from "../validation/validation";
import { title } from "process";

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

  static async destoryByAlbumId(albumId: number): Promise<AlbumsResponse> {
    const isAlbumExists = await prisma.album.findUnique({
      where: {
        id: albumId,
      },
    });

    if (!isAlbumExists) {
      throw new ErrorResponse(404, "album not found");
    }

    const [album] = await prisma.$transaction([
      prisma.album.delete({
        where: {
          id: albumId,
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

  static async patchByAlbumId(
    albumId: number,
    request: AlbumsRequest
  ): Promise<AlbumsResponse> {
    const [album] = await prisma.$transaction([
      prisma.album.update({
        where: {
          id: albumId,
        },
        data: {
          userId: request.userId,
          title: request.title,
        },
      }),
    ]);

    return toAlbumsResponse(album);
  }

  static async getAllFromApi(query: AlbumsQuery): Promise<AxiosResponse> {
    const queryParams: any = {};

    if (query.userId) {
      queryParams.params = {};
      queryParams.params.userId = query.userId;
    }
    const albums: AxiosResponse = await axios.get(
      "https://jsonplaceholder.typicode.com/albums",
      queryParams
    );

    return albums.data;
  }

  static async storeFromApi(request: AlbumsRequest): Promise<AxiosResponse> {
    const requestBody: AlbumsRequest = Validation.validate(
      AlbumsValidation.AlbumRequest,
      request
    );

    const album: AxiosResponse = await axios.post(
      "https://jsonplaceholder.typicode.com/albums",
      {
        userId: requestBody.userId,
        title: requestBody.title,
      }
    );

    return album.data;
  }

  static async findByAlbumIdFromApi(albumId: number): Promise<AxiosResponse> {
    const album: AxiosResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/albums/${albumId}`
    );

    return album.data;
  }

  static async updateByAlbumIdFromApi(
    albumId: number,
    request: AlbumsRequest
  ): Promise<AxiosResponse> {
    const requestBody: AlbumsRequest = Validation.validate(
      AlbumsValidation.AlbumRequest,
      request
    );

    const album: AxiosResponse = await axios.put(
      `https://jsonplaceholder.typicode.com/albums/${albumId}`,
      {
        userId: requestBody.userId,
        title: requestBody.title,
      }
    );

    return album.data;
  }

  static async destroyByAlbumIdFromApi(
    albumId: number
  ): Promise<AxiosResponse> {
    const album: AxiosResponse = await axios.delete(
      `https://jsonplaceholder.typicode.com/albums/${albumId}`
    );

    return album.data;
  }

  static async patchByAlbumIdFromApi(
    albumId: number,
    request: AlbumsRequest
  ): Promise<AxiosResponse> {
    const album: AxiosResponse = await axios.patch(
      `https://jsonplaceholder.typicode.com/albums/${albumId}`,
      {
        userId: request.userId,
        title: request.title,
      }
    );

    return album.data;
  }
}
