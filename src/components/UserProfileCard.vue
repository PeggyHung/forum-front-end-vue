<template>
  <div class="card mb-3">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img :src="user.image | emptyImage" width="300px" height="300px" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ user.name }}</h5>
          <p class="card-text">{{ user.email }}</p>
          <ul class="list-unstyled list-inline">
            <li>
              <strong>{{ user.commentsNum }}</strong> 已評論餐廳
            </li>
            <li>
              <strong>{{ user.favoritedRestaurantsNum }}</strong> 收藏的餐廳
            </li>
            <li>
              <strong>{{ user.followersNum }}</strong> followings (追蹤者)
            </li>
            <li>
              <strong>{{ user.followingsNum }}</strong> followers (追隨者)
            </li>
          </ul>

          <template v-if="isCurrentUser">
            <router-link
              :to="{ name: 'user-edit', params: { id: user.id } }"
              class="btn btn-primary"
            >
              edit
            </router-link>
          </template>

          <template v-else>
            <button
              v-if="isFollowed"
              type="button"
              class="btn btn-danger"
              @click.stop.prevent="deleteFollowing(user.id)"
            >
              取消追蹤
            </button>
            <button
              v-else
              type="button"
              class="btn btn-primary"
              @click.stop.prevent="addFollowing(user.id)"
            >
              追蹤
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "./../utils/mixins";
import { Toast } from "./../utils/helpers";
import usersAPI from "./../apis/users";

export default {
  mixins: [emptyImageFilter],
  props: {
    user: {
      type: Object,
      required: true,
    },
    isCurrentUser: {
      type: Boolean,
      required: true,
    },
    initialIsFollowed: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isFollowed: this.initialIsFollowed,
    };
  },
  watch: {
    initialIsFollowed(newValue) {
      this.isFollowed = newValue;
    },
  },
  methods: {
    async addFollowing(userId) {
      try {
        const response = await usersAPI.addFollowing({ userId });
        console.log("response", response);

        const { data, statusText } = response;

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.isFollowed = true;
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法加入追隨，請稍後再試",
        });
      }
    },
    async deleteFollowing(userId) {
      try {
        const response = await usersAPI.deleteFollowing({ userId });
        console.log("response", response);

        const { data, statusText } = response;

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.isFollowed = false;
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法移除追隨，請稍後再試",
        });
      }
    },
  },
};
</script>