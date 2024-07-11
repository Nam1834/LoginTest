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
      console.log("testtttttt", err);
      //* Pass err to next
      //! If validation error occurs call next with HTTP 422. Otherwise HTTP 500
      if (err.isJoi) {
        return res.status(422).json({ message: err.message });
      }
      return res.status(500).json({ message: err.message });
    }
  };
};
