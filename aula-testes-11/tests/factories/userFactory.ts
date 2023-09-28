import { UserInput } from "../../src/repository";

export function createValidUser(): UserInput {
    return {
        email: "validemail@test.com",
        password: "validpassword",
    };
}