import express from 'express';
import carta_vidaController from './cargo.controller.js';
import { sanitize } from '../../../middleware/sanitizer.js';
import { jwtStrategy } from '../../../middleware/strategy.js';
import { validateBody, schemas } from '../../../middleware/validator.js';
import { s3, bucket, upload } from "../../../middleware/bucket.js";

export const carta_vidaRouter = express.Router();
carta_vidaRouter.route('/upload').get(upload.single('file'), carta_vidaController.uploadController);









