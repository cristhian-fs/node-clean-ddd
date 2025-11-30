import type { Answer } from "../../enterprise/entities/answer.js";

export interface AnswersRepository {
  create(answer: Answer): Promise<void>;
  findById(id: string): Promise<Answer | null>;
  save(question: Answer): Promise<Answer>;
  delete(question: Answer): Promise<void>;
}
