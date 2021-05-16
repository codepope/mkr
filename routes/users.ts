import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();
// controller
import usersController from "../controllers/users.ts";

router
  .get("/users/:id", usersController.getUserById)
  .post("/users", usersController.createUser)
  .put("/users/:id", usersController.updateUserById)
  .delete("/users/:id", usersController.deleteUserById);

export default router;