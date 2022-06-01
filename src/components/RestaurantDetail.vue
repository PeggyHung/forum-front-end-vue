<template>
  <div class="row">
    <div class="col-md-12 mb-3">
      <h1>{{restaurantShow.name}}</h1>
      <p class="badge badge-secondary mt-1 mb-3">
        {{restaurantShow.categoryName}}
      </p>
    </div>
    <div class="col-lg-4">
      <img
        class="img-responsive center-block" 
        :src="restaurantShow.image"
        style="width: 250px;margin-bottom: 25px;"
      >
      <div class="contact-info-wrap">
        <ul class="list-unstyled">
          <li>
            <strong>Opening Hour:</strong>
            {{restaurantShow.openingHours}}
          </li>
          <li>
            <strong>Tel:</strong>
            {{restaurantShow.tel}}
          </li>
          <li>
            <strong>Address:</strong>
            {{restaurantShow.address}}
          </li>
        </ul>
      </div>
    </div>
    <div class="col-lg-8">
      <p>{{restaurantShow.description}}</p>
      <router-link
        class="btn btn-primary btn-border mr-2"
        :to="{name: 'restaurant-dashboard', params: {id: restaurantShow.id}}"
      >Dashboard</router-link>

      <button
        v-if="restaurantShow.isFavorited"
        type="button"
        class="btn btn-danger btn-border mr-2"
        @click.stop.prevent="deleteFavorite(restaurantShow.id)"
      >
        移除最愛
      </button>
      <button
        v-else
        type="button"
        class="btn btn-primary btn-border mr-2"
        @click.stop.prevent="addFavorite(restaurantShow.id)"
      >
        加到最愛
      </button>
      <button
        v-if="restaurantShow.isLiked"
        type="button"
        class="btn btn-danger like mr-2"
        @click.stop.prevent="deleteLike(restaurantShow.id)"
      >
        Unlike
      </button>
      <button
        v-else
        type="button"
        class="btn btn-primary like mr-2"
        @click.stop.prevent="addLike(restaurantShow.id)"
      >
        Like
      </button>
    </div>
  </div>
</template>

<script>
import usersAPI from './../apis/users'
import {Toast} from './../utils/helpers'

export default {
  props: {
    initialRestaurant: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      restaurantShow: this.initialRestaurant
    }
  },
  watch: {
    initialRestaurant(newValue) {
      this.restaurantShow = {
        ...this.restaurantShow,
        ...newValue
      }
    }
  },
  methods: {
    async addFavorite(id) {
      try {
        const {data} = await usersAPI.addFavorite({ restaurantId: id })
        // console.log('data', data)

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.restaurantShow.isFavorited = true
      } catch (error) {
        Toast.fire({
          icon: 'warning',
          title: '無法成功將餐廳加入最愛，請稍後再試'
        })
      }
    },
    async deleteFavorite(id) {
      try {
        const {data} = await usersAPI.deleteFavorite({ restaurantId: id })
        // console.log('data', data)

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.restaurantShow.isFavorited = false
      } catch (error) {
        Toast.fire({
          icon: 'warning',
          title: '無法成功將餐廳移除最愛，請稍後再試'
        })
      }
    },
    async addLike(id) {
      try {
        const {data} = await usersAPI.addLike({ restaurantId: id })
        // console.log('data', data)

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.restaurantShow.isLiked = true
      } catch (error) {
        Toast.fire({
          icon: 'warning',
          title: '無法成功將餐廳加入按讚，請稍後再試'
        })
      }
    },
    async deleteLike(id) {
      try {
        const {data} = await usersAPI.deleteLike({ restaurantId: id })
        // console.log('data', data)

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.restaurantShow.isLiked = false
      } catch (error) {
        Toast.fire({
          icon: 'warning',
          title: '無法成功將餐廳移除按讚，請稍後再試'
        })
      }
    }
  }
}
</script>

<style scoped>
.col-lg-8 p,
.contact-info-wrap li,
.contact-info-wrap strong {
  font-family: serif;
  font-size: 17px;
}
</style>