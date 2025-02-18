import { Expose, Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UserDTO {
    @Expose()
    @IsNotEmpty({ message: 'Id can\'t be empty' })
    id!: string;

    @Expose()
    @IsNotEmpty({ message: 'First name can\'t be empty' })
    @Length(3, 50, { message: 'First Name must be between 3 and 50 characters' })
    firstName!: string;

    @Expose()
    @IsNotEmpty({ message: 'Last name can\'t be empty' })
    @Length(3, 50, { message: 'Last Name must be between 3 and 50 characters' })
    lastName!: string;

    @Expose()
    @IsEmail({}, { message: 'Email is required' })
    email!: string

    @Expose()
    avatar!: string;

    @Exclude()
    password!: string;
}
