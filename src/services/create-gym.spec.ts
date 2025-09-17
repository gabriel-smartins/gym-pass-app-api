import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymService } from "./create-gym";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymService;

describe("Register Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymService(gymsRepository);
  });

  it("should be able to register", async () => {
    const { gym } = await sut.execute({
      title: "Free Form",
      description: null,
      phone: null,
      latitude: -15.9514624,
      longitude: -48.2607104,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
