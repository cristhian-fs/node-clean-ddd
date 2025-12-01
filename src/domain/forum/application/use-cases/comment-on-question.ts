import { UniqueEntityID } from "@/core/entities/unique-entity-id.js";
import type { QuestionsRepository } from "../repositories/questions-repository.js";
import { QuestionComment } from "../../enterprise/entities/question-comment.js";
import type { QuestionCommentsRepository } from "../repositories/question-comments-repository.js";

interface CommentOnQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  content: string;
}

interface CommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment;
}

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionCommentsRepository,
  ) { }

  async execute({
    content,
    authorId,
    questionId,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) throw new Error("Question not found.");

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content,
    });

    await this.questionCommentsRepository.create(questionComment);

    return { questionComment };
  }
}
