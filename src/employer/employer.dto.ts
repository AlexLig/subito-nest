import {
  IsOptional,
  IsString,
  MaxLength,
  IsNumberString,
  IsAlphanumeric,
  Length,
} from 'class-validator';
import { generalErrors as e } from '../shared';

export class EmployerDto {
  @IsString()
  @MaxLength(255, { message: e.TOO_MANY_CHARACTERS })
  readonly name: string;

  @IsNumberString({ message: e.INSERT_ONLY_NUMBERS })
  @IsAlphanumeric({ message: e.INSERT_ONLY_NUMBERS })
  @Length(9, 9, { message: e.VAT_LENGTH })
  readonly vat: string;

  @IsOptional()
  @IsNumberString({ message: e.INSERT_ONLY_NUMBERS })
  @IsAlphanumeric({ message: e.INSERT_ONLY_NUMBERS })
  @Length(10, 10, { message: e.AME_LENGTH })
  readonly ame?: string;
}
