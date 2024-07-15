import { NextFunction, Request, Response } from "express";

const Joi = require("joi");

const Validators = require("../validators/index.validator");

module.exports = function (validator: any) {
  if (!Validators.hasOwnProperty(validator))
    throw new Error(`'${validator}' validator is not exist`);

  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const validated = await Validators[validator].validateAsync(req.body);

      req.body = validated;

      next();
    } catch (err: any) {
      console.log("Validation Error: ", err);

      const errStatus = err.isJoi ? 422 : 500;
      const errMsg = err.message || "Something went wrong";

      res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === "development" ? err.stack : {},
      });
    }
  };
};
