import { Request, Response, NextFunction } from 'express';

declare module 'swagger-ui-express' {
  export interface SwaggerUiOptions {
    [key: string]: any;
  }

  export interface SwaggerOptions {
    [key: string]: any;
  }

  export function serve(req: Request, res: Response, next: NextFunction): void;
  export function setup(swaggerDoc: any, opts?: SwaggerUiOptions, options?: SwaggerOptions): (req: Request, res: Response, next: NextFunction) => void;
} 