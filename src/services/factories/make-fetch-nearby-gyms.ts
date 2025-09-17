import { PrismaGymsReposiitory } from "@/repositories/prisma/prisma-gyms-repository";
import { FetchNearbyGymsService } from "../fetch-nearby-gyms";

export function makeFetchNearbyGymsService() {
  const gymsRepository = new PrismaGymsReposiitory();

  const service = new FetchNearbyGymsService(gymsRepository);

  return service;
}
