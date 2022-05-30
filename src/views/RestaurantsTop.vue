<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">
      人氣餐廳
    </h1>

    <hr>
    <RestaurantTopCard v-for="restaurant in restaurants" :key="restaurant.id" :initial-restaurant="restaurant" />
  </div>
</template>

<script>
import NavTabs from './../components/NavTabs'
import RestaurantTopCard from './../components/RestaurantTopCard'
import restaurantsAPI from './../apis/restaurants'
import {Toast} from './../utils/helpers'

export default {
  components: {
    NavTabs,
    RestaurantTopCard
  },
  data() {
    return {
      restaurants: []
    }
  },
  created() {
    this.fetchTopRestaurants()
  },
  methods: {
    async fetchTopRestaurants() {
      try {
        const response = await restaurantsAPI.getTopRestaurants()
        
        // console.log('response', response)
     
        const {data, request} = response

        if (request.statusText !== 'OK') {
          throw new Error(data.message)
        }
 
        this.restaurants = data.restaurants
      } catch (error) {
        Toast.fire({
          icon: 'warning',
          title: '無法取得人氣餐廳資料,請稍後再試'
        })
      }
    }
  }
}
</script>