import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, PrimaryColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column('varchar', { length: 200 })
    @IsNotEmpty({ message: 'O nome não pode estar vazio' })
    name: string;

    @Column({
        type: "varchar",
        length: 150,
        unique: true,
    })
    @IsNotEmpty({ message: 'O e-mail não pode estar vazio' })
    @IsEmail({}, { message: 'Formato de e-mail inválido' })
    email: string;

    @Column('text')
    @IsNotEmpty({ message: 'A senha não pode estar vazia' })
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    password: string;
}

export class UserData {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column('varchar', { length: 200 })
    @IsNotEmpty({ message: 'O nome não pode estar vazio' })
    name: string;

    @Column({
        type: "varchar",
        length: 150,
        unique: true,
    })
    @IsNotEmpty({ message: 'O e-mail não pode estar vazio' })
    @IsEmail({}, { message: 'Formato de e-mail inválido' })
    email: string;
}

export class SignInUser {

    @IsNotEmpty({ message: 'O e-mail não pode estar vazio' })
    @IsEmail({}, { message: 'Formato de e-mail inválido' })
    email: string;

    @IsNotEmpty({ message: 'A senha não pode estar vazia' })
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    password: string;
}
