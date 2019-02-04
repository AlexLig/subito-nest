import {
  IsString,
  Length,
  IsNumberString,
  IsAlphanumeric,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  readonly name: string;

  @IsNumberString({ message: 'Εισάγετε μόνο από αριθμούς' })
  @IsAlphanumeric({ message: 'Εισάγετε μόνο από αριθμούς' })
  @Length(9, 9, { message: 'Ο ΑΦΜ αποτελείται από 9 αριθμούς' })
  readonly vat: string;
}
