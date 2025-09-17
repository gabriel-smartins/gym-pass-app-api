import { PrismaGymsReposiitory } from "@/repositories/prisma/prisma-gyms-repository";
import { CreateGymService } from "../create-gym";

export function makeCreateGymService() {
  const gymsRepository = new PrismaGymsReposiitory();

  const service = new CreateGymService(gymsRepository);

  return service;
}
