import type { AnswerCommentsRepository } from "../repositories/answer-comments-repository.js";

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string;
  answerCommentId: string;
}

interface DeleteAnswerCommentUseCaseResponse { }

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) { }

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId);

    if (!answerComment) throw new Error("Question not found.");

    if (authorId.toString() !== answerComment.authorId.toString()) {
      throw new Error("Not allowed");
    }

    await this.answerCommentsRepository.delete(answerComment);

    return {};
  }
}
