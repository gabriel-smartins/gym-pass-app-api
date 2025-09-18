import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";

describe("Search Gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to search a gym", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Free Form",
        description: "some description",
        phone: "921091209102",
        latitude: -15.9514624,
        longitude: -48.2607104,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Moviment",
        description: "some description",
        phone: "921091209102",
        latitude: -15.9514624,
        longitude: -48.2607104,
      });

    const response = await request(app.server)
      .get("/gyms/search")
      .query({
        query: "Free",
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "Free Form",
      }),
    ]);
  });
});
