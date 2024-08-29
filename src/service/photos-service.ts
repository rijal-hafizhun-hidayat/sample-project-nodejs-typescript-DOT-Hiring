import axios, { AxiosResponse } from "axios";
import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  PhotosQuery,
  PhotosRequest,
  PhotosResponse,
  toPhotosResponse,
} from "../model/photos-model";
import { PhotosValidation } from "../validation/photos-validation";
import { Validation } from "../validation/validation";

export class PhotosService {
  static async getAllByAlbumId(request: PhotosQuery): Promise<any> {
    if (!request.albumId) {
      throw new ErrorResponse(404, "albumId is required");
    }

    const photos = await prisma.photo.findMany({
      where: {
        albumId: parseInt(request.albumId),
      },
    });

    return photos;
  }

  static async store(request: PhotosRequest): Promise<PhotosResponse> {
    const requestBody: PhotosRequest = Validation.validate(
      PhotosValidation.PhotosRequest,
      request
    );

    const isAlbumExists = await prisma.album.findUnique({
      where: {
        id: requestBody.albumId,
      },
    });

    if (!isAlbumExists) {
      throw new ErrorResponse(404, "album is not exists");
    }

    const [photo] = await prisma.$transaction([
      prisma.photo.create({
        data: {
          albumId: requestBody.albumId,
          title: requestBody.title,
          url: requestBody.url,
          thumbnailUrl: requestBody.thumbnailUrl,
        },
      }),
    ]);

    return toPhotosResponse(photo);
  }

  static async findByPhotoId(photoId: number): Promise<PhotosResponse> {
    const photo = await prisma.photo.findUnique({
      where: {
        id: photoId,
      },
    });

    if (!photo) {
      throw new ErrorResponse(404, "photo not found");
    }

    return toPhotosResponse(photo);
  }

  static async updateByPhotoId(
    photoId: number,
    request: PhotosRequest
  ): Promise<PhotosResponse> {
    const requestBody: PhotosRequest = Validation.validate(
      PhotosValidation.PhotosRequest,
      request
    );

    const isAlbumExists = await prisma.album.findUnique({
      where: {
        id: requestBody.albumId,
      },
    });

    if (!isAlbumExists) {
      throw new ErrorResponse(404, "album is not exists");
    }

    const [photo] = await prisma.$transaction([
      prisma.photo.update({
        where: {
          id: photoId,
        },
        data: {
          albumId: requestBody.albumId,
          title: requestBody.title,
          url: requestBody.url,
          thumbnailUrl: requestBody.thumbnailUrl,
        },
      }),
    ]);

    return toPhotosResponse(photo);
  }

  static async patchByPhotoId(
    photoId: number,
    request: PhotosRequest
  ): Promise<PhotosResponse> {
    const [photo] = await prisma.$transaction([
      prisma.photo.update({
        where: {
          id: photoId,
        },
        data: {
          albumId: request.albumId,
          title: request.title,
          url: request.url,
          thumbnailUrl: request.thumbnailUrl,
        },
      }),
    ]);

    return toPhotosResponse(photo);
  }

  static async destroyByPhotoId(photoId: number): Promise<PhotosResponse> {
    const isPhotoExists = await prisma.photo.findUnique({
      where: {
        id: photoId,
      },
    });

    if (!isPhotoExists) {
      throw new ErrorResponse(404, "photo not found");
    }

    const [photo] = await prisma.$transaction([
      prisma.photo.delete({
        where: {
          id: photoId,
        },
      }),
    ]);

    return toPhotosResponse(photo);
  }

  static async getAllFromApi(query: PhotosQuery): Promise<AxiosResponse> {
    const queryParams: any = {};

    if (query.albumId) {
      queryParams.params = {};
      queryParams.params.albumId = parseInt(query.albumId);
    }

    const photos: AxiosResponse = await axios.get(
      "https://jsonplaceholder.typicode.com/photos",
      queryParams
    );

    return photos.data;
  }

  static async storeFromApi(request: PhotosRequest): Promise<AxiosResponse> {
    const requestBody: PhotosRequest = Validation.validate(
      PhotosValidation.PhotosRequest,
      request
    );

    const photo: AxiosResponse = await axios.post(
      "https://jsonplaceholder.typicode.com/photos",
      {
        albumId: requestBody.albumId,
        title: requestBody.title,
        url: requestBody.url,
        thumbnailUrl: requestBody.thumbnailUrl,
      }
    );

    return photo.data;
  }

  static async findByPhotoIdFromApi(photoId: number): Promise<AxiosResponse> {
    const photos: AxiosResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/photos/${photoId}`
    );

    return photos.data;
  }

  static async updateByPhotoIdFromApi(
    photoId: number,
    request: PhotosRequest
  ): Promise<AxiosResponse> {
    const requestBody: PhotosRequest = Validation.validate(
      PhotosValidation.PhotosRequest,
      request
    );

    const photo: AxiosResponse = await axios.put(
      `https://jsonplaceholder.typicode.com/photos/${photoId}`,
      {
        albumId: requestBody.albumId,
        title: requestBody.title,
        url: requestBody.url,
        thumbnailUrl: requestBody.thumbnailUrl,
      }
    );

    return photo.data;
  }

  static async destroyByPhotoIdFromApi(
    photoId: number
  ): Promise<AxiosResponse> {
    const photo: AxiosResponse = await axios.delete(
      `https://jsonplaceholder.typicode.com/photos/${photoId}`
    );

    return photo.data;
  }

  static async patchByPhotoIdFromApi(
    photoId: number,
    request: PhotosRequest
  ): Promise<AxiosResponse> {
    const photo: AxiosResponse = await axios.patch(
      `https://jsonplaceholder.typicode.com/photos/${photoId}`,
      {
        albumId: request.albumId,
        title: request.title,
        url: request.url,
        thumbnailUrl: request.thumbnailUrl,
      }
    );

    return photo.data;
  }
}
