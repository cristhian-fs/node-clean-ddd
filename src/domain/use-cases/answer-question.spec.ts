import { test, expect } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question.js'

test('Create an answer', () => {
  const answerUseCase = new AnswerQuestionUseCase();

  const answer = answerUseCase.execute({
    content: 'Nova resposta',
    instructorId: '1',
    questionId: '1',
  })

  expect(answer.content).toEqual('Nova resposta')
})
