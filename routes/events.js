import { Router } from "express";
import { check } from "express-validator";
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../controllers/events.js";
import { validateJWT } from "../middlewares/validateJWT.js";
import { fieldsValidate } from "../middlewares/fieldsValidate.js";
import { validDate } from "../helpers/validDate.js";

/*
  Route /api/events
*/

const router = Router();

router.use(validateJWT);

router.get("/", getEvents);
router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").notEmpty(),
    check("start", "La fecha de Inicio es obligatoria").custom(validDate),
    check("end", "La fecha de fin es obligatoria").custom(validDate),
    fieldsValidate,
  ],
  createEvent
);
router.put(
  "/:id",
  [
    check("title", "El titulo es obligatorio").notEmpty(),
    check("start", "La fecha de Inicio es obligatoria").custom(validDate),
    check("end", "La fecha de fin es obligatoria").custom(validDate),
    fieldsValidate,
  ],
  updateEvent
);
router.delete("/:id", deleteEvent);

export default router;
