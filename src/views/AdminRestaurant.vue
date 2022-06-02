<template>
  <div class="container py-5">
    <Spinner v-if="isLoading" />
    <div v-else class="row">
      <div class="col-md-12">
        <h1>{{ restaurant.name }}</h1>
        <span class="badge badge-secondary mt-1 mb-3">
          {{ restaurant.categoryName }}
        </span>
      </div>
      <div class="col-md-4">
        <img
          class="img-responsive center-block"
          :src="restaurant.image | emptyImage"
          style="width: 250px;margin-bottom: 25px;"
        >
        <div class="well">
          <ul class="list-unstyled">
            <li>
              <strong>Opening Hour:</strong>
              {{ restaurant.openingHours }}
            </li>
            <li>
              <strong>Tel:</strong>
              {{ restaurant.tel }}
            </li>
            <li>
              <strong>Address:</strong>
              {{ restaurant.address }}
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-8">
        <p>{{ restaurant.description }}</p>
      </div>
    </div>
    <hr>
    <button
      type="button"
      class="btn btn-link"
      @click="$router.back()"
    >回上一頁</button>
  </div>
</template>

<script>
import { emptyImageFilter } from './../utils/mixins'
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helpers'
import Spinner from './../components/Spinner'

export default {
  name: 'AdminRestaurant',
  mixins: [emptyImageFilter],
  components: {
    Spinner
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: '',
        tel: '',
        address: '',
        openingHours: '',
        description: '',
        image: '',
        categoryName: ''
      },
      isLoading: true
    }
  },
  beforeRouteUpdate(to, from, next) {
    // console.log('beforeRouteUpdate', {
    //   to, from
    // })
    const {id} = to.params
    this.fetchRestaurant(id)
    next()
  },
  mounted() {
    const { id: restaurantId } = this.$route.params
    this.fetchRestaurant(restaurantId)
  },
  methods: {
    async fetchRestaurant (restaurantId) {
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
          Category,
        } = data.restaurant

        this.restaurant = {
          ...this.restaurant,
          id,
          name,
          tel,
          address,
          openingHours,
          description,
          image,
          categoryName: Category ? Category.name : '未分類'
        }
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'warning',
          title: '無法取得餐廳資料，請稍後再試'
        })
      }
    }
  }
}
</script>