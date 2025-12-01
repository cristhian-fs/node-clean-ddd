import type { AnswerComment } from "../../enterprise/entities/answer-comment";

export interface AnswerCommentsRepository {
  findById(id: string): Promise<AnswerComment | null>;
  create(question: AnswerComment): Promise<void>;
  delete(questionComment: AnswerComment): Promise<void>;
}
