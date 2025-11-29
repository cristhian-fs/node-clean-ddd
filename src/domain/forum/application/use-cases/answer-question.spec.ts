import { AnswerQuestionUseCase } from "./answer-question.js";
import { test, expect, describe, beforeEach } from "vitest";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository.js";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe("Answer Use Case", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  test("should be able to create a question", async () => {
    const { answer } = await sut.execute({
      content: "Nova resposta",
      instructorId: "1",
      questionId: "1",
    });
    expect(answer.content).toEqual("Nova resposta");
  });
});
