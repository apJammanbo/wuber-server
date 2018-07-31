import { Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import Message from './Message';
import User from './User';

@Entity()
class Chat extends BaseEntity {
	@PrimaryGeneratedColumn() id: number;

	@OneToMany((type) => Message, (message) => message.chat)
	messages: Message[];

	@OneToMany((type) => User, (user) => user.chat)
	participants: User[];

	@CreateDateColumn() createdAt: string;
	@CreateDateColumn() updatedAt: string;
}
export default Chat;
