import { photo } from "@prisma/client";

export type PhotosQuery = {
  albumId: string;
};

export type PhotosRequest = {
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export type PhotosResponse = {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export function toPhotosResponse(photo: photo): PhotosResponse {
  return {
    id: photo.id,
    albumId: photo.albumId,
    title: photo.title,
    url: photo.url,
    thumbnailUrl: photo.thumbnailUrl,
  };
}
