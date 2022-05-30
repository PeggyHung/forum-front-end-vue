<template>
  <div class="container py-5">
    <form @submit.stop.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="name"
          type="text"
          name="name"
          class="form-control"
          placeholder="Enter Name"
          required
        />
      </div>

      <div class="form-group">
        <label for="image">Image</label>
        <img v-if="image" :src="image">
        <input
          id="image"
          type="file"
          name="image"
          accept="image/*"
          class="form-control-file"
          @change="handleFileChange"
        />
      </div>

      <button 
        type="submit" 
        class="btn btn-primary"
        :disabled="isProcessing"
      >
        {{isProcessing ? "資料更新中..." : "Submit"}}
      </button>
    </form>
  </div>
</template>

<script>
// STEP 1: 匯入 mapState 方法
import { mapState } from 'vuex'
import usersAPI from './../apis/users'
import {Toast} from './../utils/helpers'

export default {
  data() {
    return {
        id: 0,
        name: '',
        image: '',
        isProcessing: false
    };
  },
  // STEP 2: 將 currentUser 的資料從 Vuex 中取出
  computed: {
    ...mapState(['currentUser'])
  },
  created() {
    // STEP 5: 若使用者嘗試直接從路由進入其他使用者的 edit 頁
    const {id} = this.$route.params
    if (id.toString() !== this.currentUser.id.toString()) {
      this.$router.push({name: 'not-found'})
      return
    }
    this.setUser()
  },
  // STEP 6: 路由改變時重新抓取資料
  beforeRouteUpdate(to, from, next) {
    const {id} = to.params
    if (id.toString() !== this.currentUser.id.toString()) {
      this.$router.push({name: 'not-found'})
      return
    }
    this.setUser()
    next()
  },
  // STEP 4: 透過 watch 監控 currentUser 有無變化
  watch: {
    currentUser() {
      this.setUser()
    }
  },
  methods: {
    // STEP 3: 將 currentUser 的資料帶入該組件的 Vue 資料內
    setUser() {
      this.id = this.currentUser.id
      this.name = this.currentUser.name
      this.image = this.currentUser.image
    },
    handleFileChange(e) {
      const files = e.target.files
      // console.log('files', files)

      if (files.length === 0) {
        this.image = ''
      } else {
        const imgURL = window.URL.createObjectURL(files[0])
        this.image = imgURL
      }
    },
    async handleSubmit(e) {
      // 避免漏填
      if (!this.name) {
        Toast.fire({
          type: 'warning',
          title: '您尚未填寫姓名'
        })
        return
      }

      const form = e.target  // <form></form>
      const formData = new FormData(form)
      
      try {
        this.isProcessing = true
        const response = await usersAPI.update({
          userId: this.id,
          formData})
        // console.log('response', response)
        const {data, statusText} = response

        if (statusText !== 'OK' || data.status !== 'success') {
          throw new Error(statusText)
        }

        // 更新完成後轉址到使用者詳細頁
        this.$router.push({name: 'user', params: {id: this.id} })
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法更新使用者資料，請稍後再試'
        })
      }
    }
  }
};
</script>