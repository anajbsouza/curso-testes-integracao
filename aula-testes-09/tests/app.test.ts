import supertest from "supertest";

import app from "./../src/app";
import prisma from "../src/database";

const api = supertest(app);

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe("POST /users tests", () => {
  it("should create a user", async () => {
    const user = {
      email: "exemplo@gmail.com",
      password: "exemplo123"
    }
    const result = await api.post("/users").send(user);
    expect(result.status).toBe(201);
  });

  it("should receive 409 when trying to create two users with same e-mail", async () => {
    const user = {
      email: "exemplo@gmail.com",
      password: "exemplo123"
    }
    // send it once
    await api.post("/users").send(user);
    // send a second time so it shows expected status
    const result = await api.post("/users").send(user);
    expect(result.status).toBe(409);
  });

});

describe("GET /users tests", () => {
  it("should return a single user", async () => {
    const user = await prisma.user.create({
      data: {
        email: "exemplo@gmail.com",
        password: "exemplo123"
      }
    });
  
    const {status, body} = await api.get(`/users/${user.id}`);
    expect(status).toBe(200);
    // expect(body).toEqual(user);
    expect(body).toEqual({
      id: user.id,
      email: "exemplo@gmail.com",
      password: "exemplo123"
    });
  });

  it("should return 404 when can't find a user by id", async () => {
    const result = await api.get("/users/2");
    expect(result.status).toBe(404);
  });

  it("should return all users", async () => {
    const user = {
      email: "exemplo@gmail.com",
      password: "exemplo123"
    }

    await api.post("/users").send(user);
    
    const result = await api.get("/users");
    expect(result.status).toBe(200);
    expect(result.body).toHaveLength(1);
  });

})