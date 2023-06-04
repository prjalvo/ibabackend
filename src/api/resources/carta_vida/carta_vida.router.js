import express from 'express';
import cargoController from './cargo.controller.js';
import { sanitize } from '../../../middleware/sanitizer.js';
import { jwtStrategy } from '../../../middleware/strategy.js';
import { validateBody, schemas } from '../../../middleware/validator.js';
import { s3, bucket, upload } from "../../../middleware/bucket.js";

export const carta_vidaRouter = express.Router();
carta_vidaRouter.route('/create').post(sanitize(), jwtStrategy, cargoController.index);
carta_vidaRouter.route('/list').get(sanitize(),cargoController.List);
carta_vidaRouter.route('/upload').get(upload.single("file"), (req, res) => {
    return res.json({ message: req.file.location });
  });
carta_vidaRouter.route('/delete').delete(sanitize(),jwtStrategy,cargoController.getcargoDelete);
carta_vidaRouter.route('/update').post(sanitize(),jwtStrategy,cargoController.getcargoUpdate);
carta_vidaRouter.route('/getCargoById').get(sanitize(), cargoController.getCargoListById);









