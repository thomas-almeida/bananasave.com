import { Router } from 'express'
import wishlistController from './controllers/WishlistController.js'
import SurveyController from './controllers/SurveyController.js'
const api = Router()
const baseUrl = process.env.LOCAL_BASEURL

api.get(`${baseUrl}/hello`, (req, res) => {
  res.json({
    message: 'BananaSave 🍌'
  })
})

// Wishlist routes
api.post(`${baseUrl}/subscribe`, wishlistController.subscribeToWishlist)
api.get(`${baseUrl}/subscriptions`, wishlistController.getWishlistSubscriptions)

// Survey routes
api.post(`${baseUrl}/create-survey`, SurveyController.createSurvey)
api.get(`${baseUrl}/get-surveys`, SurveyController.getSurveys)
api.post(`${baseUrl}/add-question`, SurveyController.addQuestion)
api.get(`${baseUrl}/get-questions/:surveyId`, SurveyController.getQuestions)
api.post(`${baseUrl}/subit-survey`, SurveyController.submitSurvey)

export default api