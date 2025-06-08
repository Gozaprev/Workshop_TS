import { IsNotEmpty, IsNumber, IsString, IsDate, } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBudgetDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @IsDate()
  @Type(() => Date)
  fromDate: Date;

  @IsDate()
  @Type(() => Date)  // <-- this converts string to Date instance
  toDate: Date;
}

//npm install class-transformer