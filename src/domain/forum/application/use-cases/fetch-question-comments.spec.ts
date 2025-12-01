import { test, expect, describe, beforeEach } from "vitest";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository.js";
import { FetchQuestionAnswersUseCase } from "./fetch-question-answers.js";
import { makeAnswer } from "test/factories/make-answer.js";
import { UniqueEntityID } from "@/core/entities/unique-entity-id.js";
import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-repository.js";
import { FetchQuestionCommentsUseCase } from "./fetch-question-comments.js";
import { makeQuestionComment } from "test/factories/make-question-comment.js";

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: FetchQuestionCommentsUseCase;

describe("Fetch Question Answers", () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository);
  });

  test("should be able to get the question answers", async () => {
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID("question-1"),
      }),
    );

    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID("question-1"),
      }),
    );
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID("question-1"),
      }),
    );
    const { questionComments } = await sut.execute({
      page: 1,
      questionId: "question-1",
    });

    expect(questionComments).toHaveLength(3);
  });

  test("should be able to get paginated question answers", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityID("question-1"),
        }),
      );
    }

    const { questionComments } = await sut.execute({
      page: 2,
      questionId: "question-1",
    });

    expect(questionComments).toHaveLength(2);
  });
});
