import { Resolvers } from '../../../types/resolver';
import { EmailSignUpMutationArgs, EmailSignUpResponse } from '../../../types/graph';
import User from '../../../entities/User';
import createJWT from '../../../utils/createJWT';
import Verification from '../../../entities/Verificaton';
import { sendVerificationEmail } from '../../../utils/sendEmail';

const resolvers: Resolvers = {
	Mutation: {
		EmailSignUp: async (_, args: EmailSignUpMutationArgs): Promise<EmailSignUpResponse> => {
			const { email } = args;
			try {
				const existingUser = await User.findOne({ email });
				if (existingUser) {
					return {
						ok: false,
						error: 'You should log in instead',
						token: null
					};
				} else {
					const phoneVerification = await Verification.findOne({
						payload: args.phoneNumber,
						verified: true
					});
					console.log('phoneVerification', phoneVerification);
					if (phoneVerification) {
						const newUser = await User.create({ ...args }).save();
						console.log('newUser', newUser);
						if (newUser.email) {
							const emailVerification = await Verification.create({
								payload: newUser.email,
								target: 'EMAIL'
							}).save();
							console.log('emailVerification', emailVerification);
							await sendVerificationEmail(newUser.fullName, emailVerification.key);
							console.log('end');
						}
						const token = createJWT(newUser.id);
						return {
							ok: true,
							error: null,
							token
						};
					} else {
						return {
							ok: false,
							error: "You haven't verified your phone number",
							token: null
						};
					}
				}
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
