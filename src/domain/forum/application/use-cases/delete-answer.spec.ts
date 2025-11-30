import { test, expect, describe, beforeEach } from "vitest";
import { UniqueEntityID } from "@/core/entities/unique-entity-id.js";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository.js";
import { DeleteAnswerUseCase } from "./delete-answer.js";
import { makeAnswer } from "test/factories/make-answer.js";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe("Delete Answer Use Case", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
  });

  test("should be able to delete a answer", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("answer-1"),
    );

    await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      answerId: "answer-1",
      authorId: "author-1",
    });

    expect(inMemoryAnswersRepository.items).toHaveLength(0);
  });

  test("should not be able to delete a answer from another user", async () => {
    const answer = makeAnswer(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("answer-1"),
    );

    await inMemoryAnswersRepository.create(answer);

    expect(async () => {
      return await sut.execute({
        authorId: "author-1",
        answerId: "answer-2",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
