import { UniqueEntityID } from "@/core/entities/unique-entity-id.js";
import type { QuestionsRepository } from "../repositories/questions-repository.js";
import { Question } from "../../enterprise/entities/question.js";

interface CreateQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
}

interface CreateQuestionUseCaseResponse {
  question: Question;
}

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) { }

  async execute({
    content,
    authorId,
    title,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    });

    await this.questionsRepository.create(question);

    return { question };
  }
}
