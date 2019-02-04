import {
  IsString,
  Length,
  IsNumberString,
  IsAlphanumeric,
} from 'class-validator';
import { generalErrors as e } from 'src/shared';

export class CreateEmployeeDto {
  @IsString()
  readonly name: string;

  @IsNumberString({ message: e.INSERT_ONLY_NUMBERS })
  @IsAlphanumeric({ message: e.INSERT_ONLY_NUMBERS })
  @Length(9, 9, { message: e.VAT_LENGTH })
  readonly vat: string;

  @IsNumberString({ message: e.INSERT_ONLY_NUMBERS })
  @IsAlphanumeric({ message: e.INSERT_ONLY_NUMBERS })
  readonly employerId: string;
}
