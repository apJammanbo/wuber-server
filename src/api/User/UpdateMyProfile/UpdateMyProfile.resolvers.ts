import { Resolvers } from '../../../types/resolver';
import privateResolver from '../../../utils/privateResolver';
import { UpdateMyProfiletMutationArgs, UpdateMyProfileResponse } from '../../../types/graph';
import User from '../../../entities/User';
import cleanNullArgs from '../../../utils/cleanNullArgs';

const resolvers: Resolvers = {
	Mutation: {
		UpdateMyProfile: privateResolver(async (_, args: UpdateMyProfiletMutationArgs, { req }): Promise<
			UpdateMyProfileResponse
		> => {
			try {
				const user: User = req.user;
				const notNull: any = cleanNullArgs(args);

				if (notNull.password !== null) {
					user.password = notNull.password;
					user.save();
					delete notNull.password;
				}
				await User.update({ id: user.id }, { ...notNull });
				return {
					ok: true,
					error: null
				};
			} catch (error) {
				return {
					ok: false,
					error: error.message
				};
			}
			return {
				ok: true,
				error: null
			};
		})
	}
};

export default resolvers;
