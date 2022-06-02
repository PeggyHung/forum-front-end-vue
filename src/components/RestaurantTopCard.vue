<template>
  <div class="card mb-3" style="max-width: 540px; margin: auto">
    <div class="row no-gutters">
      <div class="col-md-4">
        <a href="#">
          <img class="card-img" :src="restaurant.image" />
        </a>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ restaurant.name }}</h5>
          <span class="badge badge-secondary"
            >收藏數：{{ restaurant.FavoriteCount }}</span
          >
          <p class="card-text">
            {{ restaurant.description }}
          </p>
          <router-link
            :to="{ name: 'user', params: { id: restaurant.id } }"
            class="btn btn-primary mr-2"
            >Show</router-link
          >

          <button
            v-if="restaurant.isFavorited"
            type="button"
            class="btn btn-danger mr-2"
            :disabled="isProcessing"
            @click.stop.prevent="deleteFavorite(restaurant.id)"
          >
            移除最愛
          </button>
          <button
            v-else
            type="button"
            class="btn btn-primary"
            :disabled="isProcessing"
            @click.stop.prevent="addFavorite(restaurant.id)"
          >
            加到最愛
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

export default {
  props: {
    initialRestaurant: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      restaurant: this.initialRestaurant,
      isProcessing: false,
    };
  },
  methods: {
    async addFavorite(restaurantId) {
      try {
        this.isProcessing = true;
        const response = await usersAPI.addFavorite({ restaurantId });
        // console.log("response", response);

        const { statusText, data } = response;
        // console.log("data", data);

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.restaurant.FavoriteCount++;
        this.restaurant.isFavorited = true;
        // console.log(this.restaurant)
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法將餐廳加入最愛，請稍後再試",
        });
      }
    },
    async deleteFavorite(restaurantId) {
      try {
        this.isProcessing = true;
        const response = await usersAPI.deleteFavorite({ restaurantId });

        const { statusText, data } = response;
        // console.log("data", data);

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(data.message);
        }

        this.restaurant.FavoriteCount--;
        this.restaurant.isFavorited = false;
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法將餐廳移除最愛，請稍後再試",
        });
      }
    },
  },
};
</script>