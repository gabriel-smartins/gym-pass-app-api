import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymService } from "./search-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymService;

describe("Search Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymService(gymsRepository);
  });

  it("should be able to search check for gyms", async () => {
    await gymsRepository.create({
      title: "FreeForm",
      description: null,
      phone: null,
      latitude: -15.9514624,
      longitude: -48.2607104,
    });

    await gymsRepository.create({
      title: "Moviment",
      description: null,
      phone: null,
      latitude: -15.9514624,
      longitude: -48.2607104,
    });

    const { gyms } = await sut.execute({
      query: "FreeForm",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "FreeForm" })]);
  });

  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `FreeForm ${i}`,
        description: null,
        phone: null,
        latitude: -15.9514624,
        longitude: -48.2607104,
      });
    }

    const { gyms } = await sut.execute({
      query: "FreeForm",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "FreeForm 21" }),
      expect.objectContaining({ title: "FreeForm 22" }),
    ]);
  });
});
