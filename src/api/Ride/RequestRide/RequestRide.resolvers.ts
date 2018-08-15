import { Resolvers } from "../../../types/resolver";
import User from "../../../entities/User";
import {
  RequestRideMutationArgs,
  RequestRideResponse
} from "../../../types/graph";
import privateResolver from "../../../utils/privateResolver";
import Ride from "../../../entities/Ride";

const resolvers: Resolvers = {
  Mutation: {
    RequestRide: privateResolver(
      async (
        _,
        args: RequestRideMutationArgs,
        { req }
      ): Promise<RequestRideResponse> => {
        const user: User = req.user;
        try {
          const ride = await Ride.create({ ...args, passenger: user }).save();
          return {
            ok: true,
            error: null,
            ride: ride
          };
        } catch (error) {
          return {
            ok: false,
            error: null,
            ride: null
          };
        }
      }
    )
  }
};

export default resolvers;
