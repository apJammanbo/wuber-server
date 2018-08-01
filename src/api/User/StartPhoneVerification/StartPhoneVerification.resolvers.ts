import { Resolvers } from '../../../types/resolver';
import { StartPhoneVerificationMutationArgs, StartPhoneVerificationResponse } from '../../../types/graph';
import Verification from '../../../entities/Verificaton';
import { sendVerificationSMS } from '../../../utils/sendSMS';

const resolvers: Resolvers = {
	Mutation: {
		StartPhoneVerification: async (
			_,
			args: StartPhoneVerificationMutationArgs
		): Promise<StartPhoneVerificationResponse> => {
			console.log('start');
			const { phoneNumber } = args;
			try {
				const existingVerification = await Verification.findOne({ payload: phoneNumber });
				if (existingVerification) {
					existingVerification.remove();
				}
				const newVerification = await Verification.create({ payload: phoneNumber, target: 'PHONE' }).save();
				await sendVerificationSMS(newVerification.payload, newVerification.key);
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
		}
	}
};

export default resolvers;