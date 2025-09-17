import { SearchGymService } from "../search-gyms";
import { PrismaGymsReposiitory } from "@/repositories/prisma/prisma-gyms-repository";

export function makeSearchGymsService() {
  const gymsRepository = new PrismaGymsReposiitory();

  const service = new SearchGymService(gymsRepository);

  return service;
}
