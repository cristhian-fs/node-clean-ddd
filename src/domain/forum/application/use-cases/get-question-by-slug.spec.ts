import { test, expect, describe, beforeEach } from "vitest";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository.js";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug.js";
import { Question } from "../../enterprise/entities/question.js";
import { UniqueEntityID } from "@/core/entities/unique-entity-id.js";
import { Slug } from "../../enterprise/entities/value-objects/slug.js";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe("Get Question By Slug", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  test("should be able to get a question by slug", async () => {
    const newQuestion = Question.create({
      authorId: new UniqueEntityID(),
      title: "Example question",
      slug: Slug.create("example-question"),
      content: "Example content",
    });

    await inMemoryQuestionsRepository.create(newQuestion);

    const { question } = await sut.execute({
      slug: "example-question",
    });
    expect(question.content).toBeTruthy();
    expect(question.title).toEqual(newQuestion.title);
  });
});
