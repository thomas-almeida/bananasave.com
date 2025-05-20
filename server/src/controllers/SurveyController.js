import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function createSurvey(req, res) {

  const { title, description } = req.body;

  try {
    const newSurvey = await prisma.survey.create({
      data: {
        title,
        description
      },
    });

    res.status(200).json({
      message: "success",
      data: newSurvey,
    });

  } catch (error) {
    console.error("Error creating survey", error);
    res.status(500).json({
      message: "Error creating survey",
      error: error.message,
    });
  }

}

async function addQuestion(req, res) {
  const { surveyId, question, type, answer } = req.body;

  try {
    // Validate if the survey exists
    const surveyExists = await prisma.survey.findUnique({
      where: { id: surveyId },
    });

    if (!surveyExists) {
      return res.status(404).json({
        message: "Survey not found",
      });
    }

    // Create the question
    const newQuestion = await prisma.questions.create({
      data: {
        question,
        type,
        answer,
        surveyId,
      },
    });

    res.status(200).json({
      message: "Question added successfully",
      data: newQuestion,
    });
  } catch (error) {
    console.error("Error adding question", error);
    res.status(500).json({
      message: "Error adding question",
      error: error.message,
    });
  }
}

async function getQuestions(req, res) {

  const { surveyId } = req.query;

  try {

    const questions = await prisma.questions.findMany({
      where: {
        surveyId: surveyId,
      },
    });

    if (questions.length === 0) {
      return res.status(404).json({
        message: "No questions found for this survey",
      });
    }

    res.status(200).json({
      message: "success",
      data: questions,
    });

  } catch (error) {
    console.error("Error fetching questions", error);
    res.status(500).json({
      message: "Error fetching questions",
      error: error.message,
    });
  }

}

async function getSurveys(req, res) {
  try {

    const surveys = await prisma.survey.findMany();
    res.status(200).json({
      message: "success",
      data: surveys,
    });

  } catch (error) {
    console.error("Error fetching surveys", error);
    res.status(500).json({
      message: "Error fetching surveys",
      error: error.message,
    });
  }
}

async function submitSurvey(req, res) {
  try {

    const { surveyId, answers } = req.body

    const survey = await prisma.survey.findUnique({
      where: { id: surveyId },
    });

    if (!survey) {
      return res.status(404).json({
        message: "Survey or user not found",
      });
    }

    const newSubmission = await prisma.surveyResponses.create({
      data: {
        userId,
        answers: JSON.stringify(answers),
      }
    })

    res.status(200).json({
      message: "Survey submitted successfully",
      data: newSubmission,
    });

  } catch (error) {
    console.error("Error submitting survey", error);
    res.status(500).json({
      message: "Error submitting survey",
      error: error.message,
    });
  }
}

export default {
  createSurvey,
  getSurveys,
  addQuestion,
  getQuestions,
  submitSurvey
}