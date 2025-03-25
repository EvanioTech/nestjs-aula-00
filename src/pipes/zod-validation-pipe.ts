import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { stat } from "fs";
import { ZodError, ZodSchema } from "zod";
import { fromZodError } from "zod-validation-error";

export class ZodValidationPipe<T extends ZodSchema<any>> implements PipeTransform {
  constructor(private schema: T) {}

  transform(value: unknown) {
    try {
       this.schema.parse(value);
    } catch (error) {
        if (error instanceof ZodError) {
            throw new BadRequestException({
                message: 'Validation failed',
                statusCode: 400,
                errors: fromZodError(error)
            })
        }
            throw new BadRequestException('Validation failed');
      
    }
    
    return value;
  }
}