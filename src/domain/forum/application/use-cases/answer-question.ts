import { UniqueEntityID } from "@/core/entities/unique-entity-id.js";
import type { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository.js";
import { Answer } from "@/domain/forum/enterprise/entities/answer.js";

interface AnswerQuestionUseCaseRequest {
	instructorId: string;
	questionId: string;
	content: string;
}

export class AnswerQuestionUseCase {
	constructor(private answersRepository: AnswersRepository) {}

	async execute({
		content,
		instructorId,
		questionId,
	}: AnswerQuestionUseCaseRequest) {
		const answer = Answer.create({
			content,
			authorId: new UniqueEntityID(instructorId),
			questionId: new UniqueEntityID(questionId),
		});

		await this.answersRepository.create(answer);

		return answer;
	}
}
