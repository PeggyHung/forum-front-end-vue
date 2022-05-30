<template>
  <div>
    <h2 class="my-4">
      所有評論：
    </h2>

    <div v-for="comment in restaurantComments" :key="comment.id">
      <blockquote class="blockquote mb-0">
        <button
          v-if="currentUser.isAdmin"
          type="button"
          class="btn btn-danger float-right"
          @click.stop.prevent="handleDeleteButtonClick(comment.id)"
        >
          Delete
        </button>
        <h3>
          <router-link :to="{name: 'user', params: { id: comment.User.id }}">
            {{comment.User.name}}
          </router-link>
        </h3>
        <p>{{comment.text}}</p>
        <footer class="blockquote-footer">
          {{comment.createdAt | fromNow}}
        </footer>
      </blockquote>
      <hr>
    </div>
  </div>
</template>

<script>
import {fromNowFilter} from './../utils/mixins'
import restaurantsAPI from './../apis/restaurants'
import { Toast } from './../utils/helpers'

const dummyUser = {
  currentUser: {
    id: 1,
    name: '管理者',
    email: 'root@example.com',
    image: 'https://i.pravatar.cc/300',
    isAdmin: true
  },
  isAuthenticated: true
}

export default {
  mixins: [fromNowFilter],
  props: {
    restaurantComments: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentUser: dummyUser.currentUser
    }
  },
  methods: {
    async handleDeleteButtonClick(commentId) {
      try {
        const response = await restaurantsAPI.deleteComment({ commentId })
        console.log('response', response)
        this.$emit('after-delete-comment', commentId)
      } catch (error) {
         Toast.fire({
          icon: 'warning',
          title: '無法刪除餐廳評論，請稍後再試'
        })
      }
    }
  }
}
</script>