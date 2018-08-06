import { Resolvers } from '../../../types/resolver';
import privateResolver from '../../../utils/privateResolver';
import User from '../../../entities/User';
import { GetMyPlacesResponse } from '../../../types/graph';

const resolvers: Resolvers = {
	Query: {
		GetMyPlaces: privateResolver(async (_, __, { req }): Promise<GetMyPlacesResponse> => {
			const user = await User.findOne({ id: req.user.id }, { relations: [ 'places' ] });
			try {
				if (user) {
					return {
						ok: true,
						error: null,
						places: user.places
					};
				} else {
					return {
						ok: false,
						error: 'User not found',
						places: null
					};
				}
			} catch (error) {
				return {
					ok: false,
					error: error.message,
					places: null
				};
			}
		})
	}
};

export default resolvers;
