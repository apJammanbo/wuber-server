import { Resolvers } from '../../../types/resolver';
import { FacebookConnectMutationArgs, FacebookResponse } from '../../../types/graph';
import User from '../../../entities/User';

const resolvers: Resolvers = {
	Mutation: {
		FacebookConnect: async (_, args: FacebookConnectMutationArgs): Promise<FacebookResponse> => {
			const { fbId } = args;
			try {
				const existingUser = await User.findOne({ fbId });
				if (existingUser) {
					return {
						ok: true,
						error: null,
						token: 'Comming Soon'
					};
				} else {
				}
			} catch (error) {
				return {
					ok: false,
					error: error.message,
					token: null
				};
			}

			try {
				await User.create({
					...args,
					profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square`
				}).save();

				return {
					ok: true,
					error: null,
					token: 'Comming Soon'
				};
			} catch (error) {
				return {
					ok: false,
					error: error.message,
					token: null
				};
			}
		}
	}
};

export default resolvers;
