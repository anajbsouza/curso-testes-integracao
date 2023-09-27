import supertest from "supertest";

import app from "../src/app";

const api = supertest(app);

describe("API test", () => {
  it("should return 200 when ask /health", async () => {
    const { status, text } = await api.get("/health");
    expect(status).toBe(200);
    expect(text).toBe("OK!");
  })
})

describe("sequecência de fibonacci", () => {
  it("deve retornar o status 400 para requisição inválida", async () => {
    const result = await api.get("/fibonacci");
    expect(result.status).toBe(400);
  })
  it("deve retornar o array corretamente para sequência válida", async () => {
    const elements = 5;
    const result = await api.get(`/fibonacci?elements=${elements}`);
    expect(result.status).toBe(200);
    expect(result.body).toEqual([0,1,1,2,3]);
  })
})