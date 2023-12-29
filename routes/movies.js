import { Router } from "express";
import { MovieController } from "../controllers/movies.js";
import { LedController } from "../controllers/ledController.js";

export const moviesRouter = Router();
export const ledRouter = Router();

moviesRouter.get("/", MovieController.getAll);
moviesRouter.post("/", MovieController.create);

moviesRouter.get("/:id", MovieController.getById);
moviesRouter.delete("/:id", MovieController.delete);
moviesRouter.patch("/:id", MovieController.update);

//Rutas de métodos para led
ledRouter.get("/encender", LedController.encenderLED);
ledRouter.get("/apagar", LedController.apagarLED);

// Ruta para controlar acciones con datos x e y
ledRouter.post('/control', LedController.controlarLED);