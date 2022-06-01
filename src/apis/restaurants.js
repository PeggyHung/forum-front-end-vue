import { apiHelper } from './../utils/helpers'

export default {
  createComment({ restaurantId, text }) {
    return apiHelper.post('/comments', { restaurantId, text })
  },
  deleteComment({ commentId }) {
    return apiHelper.delete(`/comments/${commentId}`)
  },
  getRestaurant({ restaurantId}) {
    return apiHelper.get(`/restaurants/${restaurantId}`)
  },
  getRestaurants({ page, categoryId }) {
    const searchParams = new URLSearchParams({ page, categoryId })
    return apiHelper.get(`/restaurants?${searchParams.toString()}`)
  },
  getFeeds() {
    return apiHelper.get('/restaurants/feeds')
  },
  getTopRestaurants() {
    return apiHelper.get('/restaurants/top')
  }
}