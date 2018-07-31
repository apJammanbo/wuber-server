import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
class Place extends BaseEntity {
	@PrimaryGeneratedColumn() id: number;

	@Column({ type: 'text' })
	name: string;

	@Column({ type: 'double precision', default: 0 })
	lng: number;

	@Column({ type: 'double precision', default: 0 })
	lat: number;

	@Column({ type: 'text' })
	adress: string;

	@Column({ type: 'boolean' })
	isFav: boolean;

	@CreateDateColumn() createdAt: string;
	@CreateDateColumn() updatedAt: string;
}
export default Place;
