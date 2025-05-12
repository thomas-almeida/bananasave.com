import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function subscribeToWishlist(req, res) {
  const { name, whatsappNumber } = req.body

  try {
    const newSubscription = await prisma.wishlist.create({
      data: {
        name,
        whatsappNumber
      }
    })

    res.status(200).json({
      message: 'success',
      data: newSubscription
    })
  } catch (error) {
    console.error('Erro ao adicionar na lista', error)
    res.status(500).json({
      message: 'Erro ao criar a inscrição na lista de espera',
      error: error.message
    })
  }
}

async function getWishlistSubscriptions(req, res) {
  try {
    const subscriptions = await prisma.wishlist.findMany()
    res.status(200).json({
      message: 'success',
      data: subscriptions
    })
  } catch (error) {
    console.error('Erro ao buscar as inscrições', error)
    res.status(500).json({
      message: 'Erro ao buscar as inscrições na lista de espera',
      error: error.message
    })
  }
}

export default {
  subscribeToWishlist,
  getWishlistSubscriptions
}