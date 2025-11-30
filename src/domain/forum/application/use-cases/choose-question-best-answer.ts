import { UniqueEntityID } from "@/core/entities/unique-entity-id.js";
import type { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository.js";
import type { Question } from "../../enterprise/entities/question";
import type { QuestionsRepository } from "../repositories/questions-repository";

interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question;
}
export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository,
  ) { }

  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found.");
    }

    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    );

    if (!question) throw new Error("Question not found");

    if (authorId !== question.authorId.toString())
      throw new Error("Not allowed");

    question.bestAnswerId = new UniqueEntityID(answerId);

    return { question };
  }
}
