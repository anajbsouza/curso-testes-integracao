import prisma from "../../src/database";
import { faker } from "@faker-js/faker";
import { UserInput } from "../../src/repository";

export async function buildUser(email: string, password?: string) {
  const userData: UserInput = {
    email: faker.internet.email(),
    password: faker.internet.password() || new Date().getTime().toString()
  };

  const user = await prisma.user.create({ data: userData });
  return user;
}