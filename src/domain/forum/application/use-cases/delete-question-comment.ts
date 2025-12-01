import type { QuestionCommentsRepository } from "../repositories/question-comments-repository.js";

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string;
  questionCommentId: string;
}

interface DeleteQuestionCommentUseCaseResponse { }

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) { }

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId);

    if (!questionComment) throw new Error("Question not found.");

    if (authorId.toString() !== questionComment.authorId.toString()) {
      throw new Error("Not allowed");
    }

    await this.questionCommentsRepository.delete(questionComment);

    return {};
  }
}
