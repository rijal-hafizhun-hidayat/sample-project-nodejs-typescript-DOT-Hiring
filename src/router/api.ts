import express from "express";
import { UsersController } from "../controller/users-controller";
import { PostsController } from "../controller/posts-controller";
import { CommentsController } from "../controller/comments-controller";
import { AlbumsController } from "../controller/albums-controller";
import { TodosController } from "../controller/todos-controller";
import { PhotosController } from "../controller/photos-controller";
import { MigrationController } from "../controller/migration-controller";

const apiRoute = express.Router();

//START ORM

apiRoute.post("/api/migration-users", MigrationController.migrationUsers);
apiRoute.post("/api/migration-posts", MigrationController.migrationPosts);

apiRoute.get("/api/users", UsersController.getAll);
apiRoute.post("/api/users-api", UsersController.storeFromApi);

apiRoute.get("/api/posts", PostsController.getAll);
apiRoute.post("/api/posts", PostsController.store);
apiRoute.get("/api/posts/:postId", PostsController.findByPostId);
apiRoute.put("/api/posts/:postId", PostsController.updateByPostId);
apiRoute.patch("/api/posts/:postId", PostsController.patchByPostId);
apiRoute.delete("/api/posts/:postId", PostsController.destroyByPostId);

apiRoute.get("/api/comments", CommentsController.getAll);
apiRoute.post("/api/comments", CommentsController.store);
apiRoute.get("/api/comments/:commentId", CommentsController.findByCommentId);
apiRoute.put("/api/comments/:commentId", CommentsController.updateByCommentId);
apiRoute.patch("/api/comments/:commentId", CommentsController.patchByCommentId);
apiRoute.delete(
  "/api/comments/:commentId",
  CommentsController.destroyByCommentId
);

apiRoute.get("/api/albums", AlbumsController.getAll);
apiRoute.post("/api/albums", AlbumsController.store);
apiRoute.get("/api/albums/:albumId", AlbumsController.findByAlbumId);
apiRoute.put("/api/albums/:albumId", AlbumsController.updateByAlbumId);
apiRoute.delete("/api/albums/:albumId", AlbumsController.destroyByAlbumId);
apiRoute.patch("/api/albums/:albumId", AlbumsController.patchByAlbumId);

apiRoute.get("/api/todos", TodosController.getAll);
apiRoute.post("/api/todos", TodosController.store);
apiRoute.get("/api/todos/:todoId", TodosController.findByTodoId);
apiRoute.put("/api/todos/:todoId", TodosController.updateByTodoId);
apiRoute.delete("/api/todos/:todoId", TodosController.destroyByTodoId);
apiRoute.patch("/api/todos/:todoId", TodosController.patchByTodoId);

apiRoute.get("/api/photos", PhotosController.getAllByAlbumId);
apiRoute.post("/api/photos", PhotosController.store);
apiRoute.get("/api/photos/:photoId", PhotosController.findByPhotoId);
apiRoute.put("/api/photos/:photoId", PhotosController.updateByPhotoId);
apiRoute.patch("/api/photos/:photoId", PhotosController.patchByPhotoId);

//END ORM

//START API

apiRoute.get("/api/posts-api", PostsController.getAllFromApi);
apiRoute.get("/api/posts-api/:postId", PostsController.findByPostIdFromApi);
apiRoute.put("/api/posts-api/:postId", PostsController.updateByPostIdFromApi);
apiRoute.delete(
  "/api/posts-api/:postId",
  PostsController.destroyByPostIdFromApi
);
apiRoute.patch("/api/posts-api/:postId", PostsController.patchByPostIdFromApi);

apiRoute.get("/api/comments-api", CommentsController.getAllFromApi);
apiRoute.post("/api/comments-api", CommentsController.storeFromApi);
apiRoute.get(
  "/api/comments-api/:commentId",
  CommentsController.findByCommentIdFromApi
);
apiRoute.put(
  "/api/comments-api/:commentId",
  CommentsController.updateByCommentIdFromApi
);
apiRoute.delete(
  "/api/comments-api/:commentId",
  CommentsController.destroyByCommentIdFromApi
);
apiRoute.patch(
  "/api/comments-api/:commentId",
  CommentsController.patchByCommentIdFromApi
);

apiRoute.get("/api/albums-api", AlbumsController.getAllFromApi);
apiRoute.post("/api/albums-api", AlbumsController.storeFromApi);
apiRoute.get("/api/albums-api/:albumId", AlbumsController.findByAlbumIdFromApi);
apiRoute.put(
  "/api/albums-api/:albumId",
  AlbumsController.updateByAlbumIdFromApi
);
apiRoute.delete(
  "/api/albums-api/:albumId",
  AlbumsController.destroyByAlbumIdFromApi
);
apiRoute.patch(
  "/api/albums-api/:albumId",
  AlbumsController.patchByAlbumIdFromApi
);

apiRoute.get("/api/photos-api", PhotosController.getAllFromApi);
apiRoute.post("/api/photos-api", PhotosController.storeFromApi);
apiRoute.get("/api/photos-api/:photoId", PhotosController.findByPhotoIdFromApi);
apiRoute.put(
  "/api/photos-api/:photoId",
  PhotosController.updateByPhotoIdFromApi
);
apiRoute.delete(
  "/api/photos-api/:photoId",
  PhotosController.destroyByPhotoIdFromApi
);
apiRoute.patch(
  "/api/photos-api/:photoId",
  PhotosController.patchByPhotoIdFromApi
);

apiRoute.get("/api/todos-api", TodosController.getAllFromApi);
apiRoute.post("/api/todos-api", TodosController.storeFromApi);
apiRoute.get("/api/todos-api/:todoId", TodosController.findByTodosIdFromApi);
apiRoute.put("/api/todos-api/:todoId", TodosController.updateByTodosIdFromApi);
apiRoute.delete(
  "/api/todos-api/:todoId",
  TodosController.destroyByTodosIdFromApi
);
apiRoute.patch("/api/todos-api/:todoId", TodosController.patchByTodoIdFromApi);
//END API
export { apiRoute };
