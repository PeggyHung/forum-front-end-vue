<template>
  <div class="container py-5">
    <NavTabs />

    <Spinner v-if="isLoading" />
    <template v-else>
      <h1 class="mt-5">美食達人</h1>
      <hr />
      <div class="row text-center">
        <div class="col-3" v-for="user in users" :key="user.id">
          <a href="#">
            <img :src="user.image" width="140px" height="140px" />
          </a>
          <h2>{{ user.name }}</h2>
          <span class="badge badge-secondary"
            >追蹤人數：{{ user.followerCount }}</span
          >
          <p class="mt-3">
            <button
              v-if="user.isFollowed"
              type="button"
              class="btn btn-danger"
              :disabled="isProcessing"
              @click.stop.prevent="deleteFollowing(user.id)"
            >
              取消追蹤
            </button>
            <button
              v-else
              type="button"
              class="btn btn-primary"
              :disabled="isProcessing"
              @click.stop.prevent="addFollowing(user.id)"
            >
              追蹤
            </button>
          </p>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import NavTabs from "./../components/NavTabs";
import Spinner from "./../components/Spinner";
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

export default {
  components: {
    NavTabs,
    Spinner,
  },
  data() {
    return {
      users: {
        id: -1,
        name: "",
        image: "",
        followerCount: 0,
        isFollowed: false,
      },
      isLoading: true,
      isProcessing: false,
    };
  },
  created() {
    this.fetchTopUsers();
  },
  methods: {
    async fetchTopUsers() {
      try {
        const { data } = await usersAPI.getTopUsers();

        // console.log('data', data)

        this.users = data.users.map((user) => ({
          id: user.id,
          name: user.name,
          image: user.image,
          followerCount: user.FollowerCount,
          isFollowed: user.isFollowed,
        }));
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "warning",
          title: "無法取得美食達人，請稍後再試",
        });
      }
    },
    async addFollowing(userId) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.addFollowing({ userId });

        // console.log('data', data)

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.users = this.users.map((user) => {
          if (user.id !== userId) {
            return user;
          } else {
            return {
              ...user,
              followerCount: user.followerCount + 1,
              isFollowed: true,
            };
          }
        });
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "warning",
          title: "無法加入追蹤，請稍後再試",
        });
      }
    },
    async deleteFollowing(userId) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.deleteFollowing({ userId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.users = this.users.map((user) => {
          if (user.id !== userId) {
            return user;
          } else {
            return {
              ...user,
              followerCount: user.followerCount - 1,
              isFollowed: false,
            };
          }
        });
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "warning",
          title: "無法取消追蹤，請稍後再試",
        });
      }
    },
  },
};
</script>