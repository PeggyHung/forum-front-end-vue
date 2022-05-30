<template>
  <div class="container py-5">
    <AdminRestaurantForm 
    :initial-restaurant="restaurant" 
    :is-processing="isProcessing"
    @after-submit="handleAfterSubmit" />
  </div>
</template>

<script>
import AdminRestaurantForm from './../components/AdminRestaurantForm.vue'
import adminAPI from './../apis/admin'
import {Toast} from './../utils/helpers'

export default {
  components: {
    AdminRestaurantForm
  },
  data () {
    return {
      restaurant: {
        id: -1,
        name: '',
        tel: '',
        address: '',
        openingHours: '',
        description: '',
        image: '',
        categoryId: '',
      },
      isProcessing: false
    }
  },
  created() {
    const {id} = this.$route.params
    this.fetchRestaurant(id)  // 使用者第一次進來頁面時，拉取餐廳資料
  },
  beforeRouteUpdate(to, from, next) {
    // console.log('beforeRouteUpdate', {
    //   to, from
    // })
    // 使用者輸入的路由改變時，重新拉取餐廳資料
    const {id} = to.params
    this.fetchRestaurant(id)
    next()
  },
  methods: {
    async handleAfterSubmit(formData) {
      try {
        this.isProcessing = true
        const {data} = await adminAPI.restaurants.update({
          restaurantId: this.restaurant.id,
          formData
        })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        
        this.$router.push({name: 'admin-restaurants'})
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon: 'warning',
          title: '無法更新餐廳資料，請稍後再試'
        })
      }
    },
    async fetchRestaurant(restaurantId) {
      try {
        const {data} = await adminAPI.restaurants.getDetail({restaurantId})
        // console.log('data', data)

        const {
          id,
          name,
          tel,
          address,
          opening_hours: openingHours,
          description,
          image,
          CategoryId: categoryId
        } = data.restaurant
        // console.log('data.restaurant', data.restaurant)

        this.restaurant = {
          ...this.restaurant,
          id,
          name,
          tel,
          address,
          openingHours,
          description,
          image,
          categoryId
        }
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