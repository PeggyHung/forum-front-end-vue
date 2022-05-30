<template>
  <div class="container py-5">
    <NavTabs />
    <!-- 餐廳類別標籤 RestaurantsNavPills -->
    <RestaurantsNavPills :categories="categories"/>
    <div class="row">
      <!-- 餐廳卡片 RestaurantCard-->
      <RestaurantCard v-for="restaurant in restaurants" :key="restaurant.id" :initialRestaurant="restaurant" />
    </div>

    <!-- 分頁標籤 RestaurantPagination -->
    <RestaurantsPagination v-if="totalPage.length > 1" :currentPage="currentPage" 
      :totalPage="totalPage" 
      :categoryId="categoryId" 
      :previousPage="previousPage" 
      :nextPage="nextPage" />
  </div>
</template>

<script>
import NavTabs from './../components/NavTabs'
import RestaurantCard from './../components/RestaurantCard'
import RestaurantsNavPills from './../components/RestaurantsNavPills'
import RestaurantsPagination from './../components/RestaurantsPagination'
import restaurantsAPI from './../apis/restaurants'
import {Toast} from './../utils/helpers'

export default {
  components: {
    NavTabs,
    RestaurantCard,
    RestaurantsNavPills,
    RestaurantsPagination
  },
  data() {
    return {
      restaurants: [],
      categories: [],
      categoryId: -1,
      currentPage: 1,
      totalPage: [],
      previousPage: -1,
      nextPage: -1
    }
  },
  created() {
    const {page = '', categoryId = ''} = this.$route.query
    this.fetchRestaurants({
      queryPage: page,
      queryCategoryId: categoryId
    })
  },
  // 使用 beforeRouteUpdate 方法取得使用者路由變化
  beforeRouteUpdate(to, from, next) {
    const {page = '', categoryId = ''} = to.query
    this.fetchRestaurants({
        queryPage: page,
        queryCategoryId: categoryId
    })
    next()
  },
  methods: {
    async fetchRestaurants ({ queryPage, queryCategoryId }) {
      try {
        const response = await restaurantsAPI.getRestaurants({
          page: queryPage,
          categoryId: queryCategoryId
        })
        // console.log('response', response)
        const {
          restaurants,
          categories,
          categoryId,
          page,
          totalPage,
          prev,
          next
        } = response.data

        this.restaurants = restaurants
        this.categories = categories
        this.categoryId = categoryId
        this.currentPage = page
        this.totalPage = totalPage
        this.previousPage = prev
        this.nextPage = next
      } catch (error) {
        Toast.fire({
          icon: 'warning',
          title: '無法取得餐廳資料，請稍後再試'
        })
      }
    }
  }
}
</script>
