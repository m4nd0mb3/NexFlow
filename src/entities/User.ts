// @ts-ignore
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
    // @ts-ignore
    @PrimaryGeneratedColumn('uuid')
        // @ts-ignore
    uuid: string;

    // @ts-ignore
    @Column('varchar', { length: 200 })
    @IsNotEmpty({ message: 'O nome não pode estar vazio' })
    // @ts-ignore
    name: string;

    // @ts-ignore
    @Column({
        type: "varchar",
        length: 150,
        unique: true,
    })
    @IsNotEmpty({ message: 'O e-mail não pode estar vazio' })
    @IsEmail({}, { message: 'Formato de e-mail inválido' })
    email: string;

    // @ts-ignore
    @Column('text')
    @IsNotEmpty({ message: 'A senha não pode estar vazia' })
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    password: string;
}

export class SignInUser {

    @IsNotEmpty({ message: 'O e-mail não pode estar vazio' })
    @IsEmail({}, { message: 'Formato de e-mail inválido' })
    email: string;

    @IsNotEmpty({ message: 'A senha não pode estar vazia' })
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    password: string;
}
