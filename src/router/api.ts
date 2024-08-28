import express from "express";
import { UsersController } from "../controller/users-controller";
import { PostsController } from "../controller/posts-controller";
import { CommentsController } from "../controller/comments-controller";
import { AlbumsController } from "../controller/albums-controller";
import { TodosController } from "../controller/todos-controller";

const apiRoute = express.Router();

apiRoute.get("/api/users", UsersController.getAll);
apiRoute.post("/api/users-api", UsersController.storeFromApi);

apiRoute.get("/api/posts", PostsController.getAll);
apiRoute.post("/api/posts", PostsController.store);
apiRoute.get("/api/posts/:postId", PostsController.findByPostId);
apiRoute.put("/api/posts/:postId", PostsController.updateByPostId);
apiRoute.patch("/api/posts/:postId", PostsController.changeUserIdByPostId);
apiRoute.delete("/api/posts/:postId", PostsController.destroyByPostId);

apiRoute.get("/api/comments", CommentsController.getAll);
apiRoute.post("/api/comments", CommentsController.store);
apiRoute.get("/api/comments/:commentId", CommentsController.findByCommentId);
apiRoute.put("/api/comments/:commentId", CommentsController.updateByCommentId);
apiRoute.patch(
  "/api/comments/:commentId",
  CommentsController.changePostIdNyCommentId
);
apiRoute.delete(
  "/api/comments/:commentId",
  CommentsController.destroyByCommentId
);

apiRoute.get("/api/albums", AlbumsController.getAll);
apiRoute.post("/api/albums", AlbumsController.store);
apiRoute.get("/api/albums/:albumId", AlbumsController.findByAlbumId);
apiRoute.put("/api/albums/:albumId", AlbumsController.updateByAlbumId);
apiRoute.delete("/api/albums/:albumId", AlbumsController.destroyByAlbumId);

apiRoute.get("/api/todos", TodosController.getAll);
apiRoute.post("/api/todos", TodosController.store);
apiRoute.get("/api/todos/:todoId", TodosController.findByTodoId);
apiRoute.put("/api/todos/:todoId", TodosController.updateByTodoId);
apiRoute.delete("/api/todos/:todoId", TodosController.destroyByTodoId);

export { apiRoute };
