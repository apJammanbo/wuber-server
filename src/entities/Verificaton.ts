import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
class Verification extends BaseEntity {
	@PrimaryGeneratedColumn() id: number;

	@Column({ type: 'text' })
	target: string;

	@Column({ type: 'text' })
	payload: string;

	@Column({ type: 'text' })
	key: string;

	@Column({ type: 'boolean', default: false })
	used: boolean;

	@CreateDateColumn() createdAt: string;
	@CreateDateColumn() updatedAt: string;
}
export default Verification;
