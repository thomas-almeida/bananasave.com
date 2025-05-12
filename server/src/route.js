import { Router } from 'express'
import wishlistController from './controllers/wishlistController.js'
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

export default api