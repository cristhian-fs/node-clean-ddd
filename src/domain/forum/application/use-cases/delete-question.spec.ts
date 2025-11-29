import { test, expect, describe, beforeEach } from "vitest";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository.js";
import { DeleteQuestionUseCase } from "./delete-question.js";
import { makeQuestion } from "test/factories/make-question.js";
import { UniqueEntityID } from "@/core/entities/unique-entity-id.js";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase;

describe("Delete Question Use Case", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
  });

  test("should be able to delete a question", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("question-1"),
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      questionId: "question-1",
      authorId: "author-1",
    });

    expect(inMemoryQuestionsRepository.items).toHaveLength(0);
  });

  test("should not be able to delete a question from another user", async () => {
    const question = makeQuestion(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("question-1"),
    );

    await inMemoryQuestionsRepository.create(question);

    expect(async () => {
      return await sut.execute({
        authorId: "author-1",
        questionId: "question-2",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
