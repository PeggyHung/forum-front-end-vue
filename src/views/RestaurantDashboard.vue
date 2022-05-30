<template>
  <div class="container py-5">
    <div>
      <h1>{{ restaurant.name }}</h1>
      <span class="badge badge-secondary mt-1 mb-3">
        {{ restaurant.categoryName }}
      </span>
    </div>

    <hr />

    <ul>
      <li>評論數： {{ restaurant.commentsNum }} </li>
      <li>瀏覽次數： {{ restaurant.viewCounts }} </li>
    </ul>

    <button type="button" class="btn btn-link" @click="$router.back()">
      回上一頁
    </button>
  </div>
</template>

<script>
import restaurantsAPI from './../apis/restaurants'
import {Toast} from './../utils/helpers'

export default {
  // name: 'RestaurantDashboard',
  data() {
    return {
     restaurant: {}  
    }
  },
  created() {
    const {id: restaurantId} = this.$route.params
    this.fetchRestaurant(restaurantId)
  },
  methods: {
    async fetchRestaurant(id) {
      try {
        const response = await restaurantsAPI.getRestaurant({restaurantId: id})
        // console.log('response', response)

        const {restaurant} = response.data
        const {
          name,
          Category,
          Comments,
          viewCounts
        } = restaurant

        this.restaurant = {
          name,
          categoryName: Category ?  Category.name : '未分類',
          commentsNum: Comments.length,
          viewCounts
        }
      } catch (error) {
        Toast.fire({
          icon: 'warning',
          title: '無法取得個別餐廳資訊，請稍後再試'
        })
      }
    }
  }
};
</script>