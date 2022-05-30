<template>
  <form @submit.stop.prevent="handleSubmit">
    <div class="form-group mb-4">
      <label for="text">留下評論：</label>
      <textarea
        v-model="text"
        class="form-control"
        rows="3"
        name="text"
      />
    </div>
    <div class="d-flex align-items-center justify-content-between">
      <button
        type="button"
        class="btn btn-link"
        @click="$router.back()"
      >回上一頁</button>
      <button
        type="submit"
        class="btn btn-primary mr-0"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script>
import restaurantsAPI from './../apis/restaurants'
import { Toast } from './../utils/helpers'

export default {
  props: {
    restaurantId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      text: ''
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const {data} = await restaurantsAPI.createComment({ restaurantId: this.restaurantId,
         text: this.text })
        // console.log('data', data)

        this.$emit('after-create-comment', {
          commentId: data.commentId, 
          restaurantId : this.restaurantId, 
          text: this.text
        })
        this.text = "" 
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法新增餐廳評論，請稍後再試'
        })
      } 
    }
  }
}
</script>