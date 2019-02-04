import {
  IsOptional,
  IsString,
  MaxLength,
  IsNumberString,
  IsAlphanumeric,
  Length,
} from 'class-validator';

export class CreateEmployerDto {
  @IsString()
  @MaxLength(255, { message: 'Εισάγετε λιγότερους χαρακτήρες' })
  readonly name: string;

  @IsNumberString({ message: 'Εισάγετε μόνο από αριθμούς' })
  @IsAlphanumeric({ message: 'Εισάγετε μόνο από αριθμούς' })
  @Length(9, 9, { message: 'Ο ΑΦΜ αποτελείται από 9 αριθμούς' })
  readonly vat: string;

  @IsOptional()
  @IsNumberString({ message: 'Εισάγετε μόνο από αριθμούς' })
  @IsAlphanumeric({ message: 'Εισάγετε μόνο από αριθμούς' })
  @Length(10, 10, { message: 'Ο ΑΜΕ αποτελείται από 10 αριθμούς' })
  readonly ame?: string;
}
