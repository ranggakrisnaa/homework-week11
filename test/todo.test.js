const app = require("../src/index")
const request = require("supertest")
const { sequelize } = require("../src/models")
const { queryInterface } = sequelize

beforeAll((done) => {
  queryInterface
    .bulkInsert(
      "Todos",
      [
        {
          id: 99991,
          title: "Learn Docker",
          description: "Learn dockerfile and dockercompose",
          is_completed: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 99992,
          title: "Doing Homework-Week11",
          description: "Finish Homework unit testing and deployment",
          is_completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 99993,
          title: "Exercising",
          description: "Jogging and push up",
          is_completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 999994,
          title: "Doing AI tasks",
          description: "create an article review report",
          is_completed: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
    .then((_) => {
      done()
    })
    .catch((err) => {
      done(err)
    })
})

afterAll((done) => {
  queryInterface
    .bulkDelete("Todos", null, {})
    .then((_) => {
      done()
    })
    .catch((err) => {
      done(err)
    })
})

describe("GET All Todos from endpoint /api/todos", () => {
  it("should return responds success with json", async () => {
    const response = await request(app)
      .get("/api/todos")
      .set("Accept", "application/json")
    const { data, success } = response.body
    expect(data.length).toBe(4)
    const firstData = data[0]
    expect(response.headers["content-type"]).toMatch(/json/)
    expect(response.status).toBe(200)
    expect(success).toBe(true)
    expect(firstData.title).toEqual("Learn Docker")
    expect(firstData.description).toEqual("Learn dockerfile and dockercompose")
    expect(firstData.is_completed).toEqual(true)
  })
})

describe("CREATE Todo from endpoint /api/todos", () => {
  it("should return responds success with json", async () => {
    const response = await request(app)
      .post("/api/todos")
      .send({
        title: "learn JavaScript",
        description: "Learn structure data and async await",
        is_completed: "true",
      })
      .set("Accept", "application/json")
    expect(response.headers["content-type"]).toMatch(/json/)
    expect(response.status).toBe(201)
    expect(response.body.success).toBe(true)
  })

  it("should return responds error with json", async () => {
    const response = await request(app)
      .post("/api/todos")
      .set("Accept", "application/json")
    expect(response.headers["content-type"]).toMatch(/json/)
    expect(response.status).toBe(400)
    expect(response.body.success).toBe(false)
  })
})

describe("GET One Todo from endpoint /api/todos/:id", () => {
  it("should return responds success with json", async () => {
    const response = await request(app)
      .get("/api/todos/99993")
      .set("Accept", "application/json")
    const { data, success } = response.body
    expect(response.headers["content-type"]).toMatch(/json/)
    expect(response.status).toBe(200)
    expect(success).toBe(true)
    expect(data.title).toEqual("Exercising")
    expect(data.description).toEqual("Jogging and push up")
    expect(data.is_completed).toEqual(false)
  })

  it("should return responds error with json", async () => {
    const response = await request(app)
      .get("/api/todos/11")
      .set("Accept", "application/json")
    expect(response.headers["content-type"]).toMatch(/json/)
    expect(response.status).toBe(404)
    expect(response.body.success).toBe(false)
  })
})

describe("UPDATE Todo from endpoint /api/todos/:id", () => {
  it("should return responds success with json", async () => {
    const response = await request(app)
      .put("/api/todos/999994")
      .send({
        title: "learn React",
        description: "Learn Hooks",
      })
      .set("Accept", "application/json")
    expect(response.headers["content-type"]).toMatch(/json/)
    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
  })

  it("should return responds error with json", async () => {
    const response = await request(app)
      .put("/api/todos/1")
      .set("Accept", "application/json")
    expect(response.headers["content-type"]).toMatch(/json/)
    expect(response.status).toBe(400)
    expect(response.body.success).toBe(false)
  })

  it("should return responds error json", async () => {
    const response = await request(app)
      .put("/api/todos/10")
      .send({
        title: "learn React",
        description: "Learn Hooks",
        is_completed: "true",
      })
      .set("Accept", "application/json")
    expect(response.headers["content-type"]).toMatch(/json/)
    expect(response.status).toBe(404)
    expect(response.body.success).toBe(false)
  })
})

describe("DELETE Todo from endpoint /api/todos/:id", () => {
  it("should return responds success with json", async () => {
    const response = await request(app)
      .delete("/api/todos/999994")
      .set("Accept", "application/json")
    expect(response.headers["content-type"]).toMatch(/json/)
    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
  })

  it("should return responds error json", async () => {
    const response = await request(app)
      .delete("/api/todos/10")
      .set("Accept", "application/json")
    expect(response.headers["content-type"]).toMatch(/json/)
    expect(response.status).toBe(404)
    expect(response.body.success).toBe(false)
  })
})
