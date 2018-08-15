import { Resolvers } from "../../../types/resolver";
import privateResolver from "../../../utils/privateResolver";
import { GetNearByRidesResponse } from "../../../types/graph";
import User from "../../../entities/User";
import { getRepository, Between } from "../../../../node_modules/typeorm";
import Ride from "../../../entities/Ride";

const resolvers: Resolvers = {
  Query: {
    GetNearByRides: privateResolver(
      async (_, __, { req }): Promise<GetNearByRidesResponse> => {
        const user: User = req.user;
        if (user.isDriving) {
          const { lastLat, lastLng } = user;
          try {
            const rides = await getRepository(Ride).find({
              status: "REQUESTIG",
              pickUpLat: Between(lastLat - 0.05, lastLat + 0.05),
              pickUpLng: Between(lastLng - 0.05, lastLng + 0.05)
            });
            return {
              ok: true,
              error: null,
              rides: rides
            };
          } catch (error) {
            return {
              ok: false,
              error: error.message,
              rides: null
            };
          }
        } else {
          return {
            ok: false,
            error: "You are not driver",
            rides: null
          };
        }
      }
    )
  }
};

export default resolvers;
