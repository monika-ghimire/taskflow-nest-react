import { Entity , PrimaryGeneratedColumn , Column } from "typeorm";

@Entity()
export class Todo {

    @PrimaryGeneratedColumn()
    id :number;

    @Column()
    title:string;

    @Column()
    date:string;

    @Column()
    completed:boolean;
    
}
