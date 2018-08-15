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
        { req, pubSub }
      ): Promise<RequestRideResponse> => {
        const user: User = req.user;
        user.isRiding = false;
        user.save();
        if (!user.isRiding && !user.isDriving) {
          try {
            const ride = await Ride.create({ ...args, passenger: user }).save();
            pubSub.publish("rideRequest", { NearByRideSubscription: ride });
            user.isRiding = true;
            user.save();
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
        } else {
          return {
            ok: false,
            error: "You can't request two rides",
            ride: null
          };
        }
      }
    )
  }
};

export default resolvers;
