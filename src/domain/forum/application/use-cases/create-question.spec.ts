import { test, expect, describe, beforeEach } from "vitest";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository.js";
import { CreateQuestionUseCase } from "./create-question.js";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe("Answer Use Case", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });

  test("should be able to create a question", async () => {
    const result = await sut.execute({
      content: "Question content",
      authorId: "1",
      title: "New question",
    });
    expect(result.value?.question.content).toEqual("Question content");
    expect(inMemoryQuestionsRepository.items[0]).toEqual(
      result.value?.question,
    );
  });
});
