import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";
 
@Entity("member")
export class MembersEntity {
 
    @PrimaryGeneratedColumn()
    memberId: number;
 
    @Column({
        length: 100
    })
    firstName: string;
 
    @Column({
        length: 100
    })
    lastName: string;
 
    @Column({
        length: 100
    })
    email: string;

    @Column({
        length: 11
    })
    telephone: string

    @Column({
        length: 300
    })
    imageUrl: string
    
    @Column({
        length: 30
    })
    role: string

    @Column({
        length: 50
    })
    twitterUrl: string

    @Column({
        length: 50
    })
    githubUrl: string

    @Column({
        length: 50
    })
    linkedinUrl: string
}