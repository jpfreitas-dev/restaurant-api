import { NextFunction, Request, Response } from "express";
import { knex } from "@/database/knex";
import { z } from "zod";
import { AppError } from "@/utils/app-error";

class ProductController {
  // Lista os produtos, com filtro opcional por nome
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { name } = request.query; 
      const products = await knex<ProductRepository>("products")
        .select() 
        .whereLike("name", `%${name ?? ""}%`) 
        .orderBy("name");

      return response.json({ products });
    } catch (error) {
      next(error);
    }
  };

  // Cria um novo produto
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string().trim().min(6),
        price: z.number().gt(0),
      });

      const { name, price } = bodySchema.parse(request.body);

      await knex<ProductRepository>("products").insert({ name, price });

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  };

  // Atualiza um produto existente
  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: "id must be a number" })
        .parse(request.params.id);

      const bodySchema = z.object({
        name: z.string().trim().min(6),
        price: z.number().gt(0),
      })

      const { name, price } = bodySchema.parse(request.body);

      const product = await knex<ProductRepository>("products")
        .where({ id })
        .select()
        .first();

      if (!product) {
        throw new AppError("Product not found", 404);
      }

      await knex<ProductRepository>("products").where({ id }).update({ name, price, updated_at: knex.fn.now() });

      return response.json()
    } catch (error) {
      next(error);
    }
  };

  // Remove um produto
  async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: "id must be a number" })
        .parse(request.params.id);

      const product = await knex<ProductRepository>("products")
        .where({ id })
        .select()
        .first();

      if (!product) {
        throw new AppError("Product not found", 404);
      }

      await knex<ProductRepository>("products").where({ id }).delete();

      return response.json();
    } catch (error) {
      next(error);
    }
  };
}

export { ProductController };