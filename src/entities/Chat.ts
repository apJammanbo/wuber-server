import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  Column,
  OneToOne
} from "typeorm";
import Message from "./Message";
import User from "./User";
import Ride from "./Ride";

@Entity()
class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => Message, message => message.chat)
  messages: Message[];

  @Column({ nullable: true })
  passengerId: number;

  @ManyToOne(type => User, user => user.chatAsPassenger)
  passenger: User;

  @Column({ nullable: true })
  rideId: number;

  @OneToOne(type => Ride, ride => ride.chat, { nullable: true })
  ride: Ride;

  @Column({ nullable: true })
  driverId: number;

  @ManyToOne(type => User, user => user.chatAsDriver)
  driver: User;

  @CreateDateColumn()
  createdAt: string;
  @CreateDateColumn()
  updatedAt: string;
}
export default Chat;
