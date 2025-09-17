import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInService } from "./check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";
import { MaxDistanceError } from "./errors/max-distance-error";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInService;

// -15.9514624 ,-48.2607104

describe("Check In Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();

    sut = new CheckInService(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: "gym-01",
      title: "Free Form",
      description: "",
      phone: "8921892981",
      latitude: -15.9514624,
      longitude: -48.2607104,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -15.9514624,
      userLongitude: -48.2607104,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not to be able to check twice in the same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -15.9514624,
      userLongitude: -48.2607104,
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -15.9514624,
        userLongitude: -48.2607104,
      })
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it("should be able to check twice in different day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -15.9514624,
      userLongitude: -48.2607104,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -15.9514624,
      userLongitude: -48.2607104,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not to be able to check in on distant gym", async () => {
    gymsRepository.items.push({
      id: "gym-02",
      title: "Free Form",
      description: "",
      phone: "8921892981",
      latitude: new Decimal(-27.0610928),
      longitude: new Decimal(-49.5229501),
    });
    await expect(() =>
      sut.execute({
        gymId: "gym-02",
        userId: "user-01",
        userLatitude: -15.9514624,
        userLongitude: -48.2607104,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
