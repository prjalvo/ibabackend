import express from 'express';
import cargoController from './cargo.controller.js';
import { sanitize } from '../../../middleware/sanitizer.js';
import { jwtStrategy } from '../../../middleware/strategy.js';
import { validateBody, schemas } from '../../../middleware/validator.js';
import { s3, bucket, upload } from "../../../middleware/bucket.js";

export const cargoRouter = express.Router();
cargoRouter.route('/create').post(sanitize(), jwtStrategy, cargoController.index);
cargoRouter.route('/list').get(sanitize(),cargoController.List);
cargoRouter.route('/upload').get(upload.single("file"), (req, res) => {
    return res.json({ message: req.file.location });
  });
cargoRouter.route('/delete').delete(sanitize(),jwtStrategy,cargoController.getcargoDelete);
cargoRouter.route('/update').post(sanitize(),jwtStrategy,cargoController.getcargoUpdate);
cargoRouter.route('/getCargoById').get(sanitize(), cargoController.getCargoListById);









