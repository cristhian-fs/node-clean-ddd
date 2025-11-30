import type { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository.js";
import type { Answer } from "@/domain/forum/enterprise/entities/answer.js";

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = [];
  async create(answer: Answer) {
    this.items.push(answer);
  }

  async delete(answer: Answer) {
    const answerIndex = this.items.findIndex(
      (item) => item.id.toString() === answer.id.toString(),
    );

    this.items.splice(answerIndex, 1);
  }

  async findById(id: string): Promise<Answer | null> {
    const answer = this.items.find((item) => item.id.toString() === id);

    if (!answer) {
      return null;
    }

    return answer;
  }
}
