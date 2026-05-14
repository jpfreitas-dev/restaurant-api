import { AppError } from "@/utils/app-error"; 
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

// Intercepta erros lançados em qualquer parte da aplicação e formata a resposta de acordo com o tipo do erro.
export function errorHandling( error: any, request: Request, response: Response, _: NextFunction) {
  
  // Verifica se o erro é uma instância de AppError, que é um erro personalizado para erros de aplicação. Se for, retorna a mensagem e o status code definidos no AppError.
  if (error instanceof AppError) { 
    return response.status(error.statusCode).json({ message: error.message });
  }

  // Verifica se o erro é uma instância de ZodError, que é um erro de validação gerado pelo Zod. Se for, retorna um status code 400 e um objeto com os detalhes dos erros de validação
  if (error instanceof ZodError) {
    return response.status(400).json({ message: "Validation Error", issues: error.format() }); 
  }

  return response.status(500).json({ message: error.message });
}