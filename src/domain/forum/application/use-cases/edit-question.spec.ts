import { test, expect, describe, beforeEach } from "vitest";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository.js";
import { makeQuestion } from "test/factories/make-question.js";
import { UniqueEntityID } from "@/core/entities/unique-entity-id.js";
import { EditQuestionUseCase } from "./edit-question.js";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe("Edit Question Use Case", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });

  test("should be able to edit a question", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("question-1"),
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      authorId: "author-1",
      title: "Edited question",
      questionId: "question-1",
      content: "edited content",
    });

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: "Edited question",
      content: "edited content",
    });
  });

  test("should not be able to edit a question from another user", async () => {
    const question = makeQuestion(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("question-1"),
    );

    await inMemoryQuestionsRepository.create(question);

    expect(async () => {
      return await sut.execute({
        authorId: "author-2",
        title: "Edited question",
        questionId: "question-1",
        content: "edited content",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
