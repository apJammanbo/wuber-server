import { Resolvers } from "../../../types/resolver";
import privateResolver from "../../../utils/privateResolver";
import {
  UpdateMyProfileResponse,
  UpdateMyProfileMutationArgs
} from "../../../types/graph";
import User from "../../../entities/User";
import cleanNullArgs from "../../../utils/cleanNullArgs";

const resolvers: Resolvers = {
  Mutation: {
    UpdateMyProfile: privateResolver(
      async (
        _,
        args: UpdateMyProfileMutationArgs,
        { req }
      ): Promise<UpdateMyProfileResponse> => {
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
      }
    )
  }
};

export default resolvers;
