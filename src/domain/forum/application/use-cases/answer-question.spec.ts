import type { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository.js";
import { AnswerQuestionUseCase } from "./answer-question.js";
import { test, expect } from "vitest";

const fakeAnswersRepo: AnswersRepository = {
	create: async () => {
		return;
	},
};
test("Create an answer", async () => {
	const answerUseCase = new AnswerQuestionUseCase(fakeAnswersRepo);

	const answer = await answerUseCase.execute({
		content: "Nova resposta",
		instructorId: "1",
		questionId: "1",
	});

	expect(answer.content).toEqual("Nova resposta");
});
