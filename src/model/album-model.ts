import { album } from "@prisma/client";

export type AlbumsRequest = {
  userId: number;
  title: string;
};

export type AlbumsQuery = {
  userId?: number;
};

export type AlbumsResponse = {
  id: number;
  userId: number;
  title: string;
};

export function toAlbumsResponse(album: album): AlbumsResponse {
  return {
    id: album.id,
    userId: album.userId,
    title: album.title,
  };
}
