<template>
  <div class="album py-5 bg-light">
    <div class="container">
      <UserProfileCard 
       :user="user" 
       :isCurrentUser="currentUser.id === user.id"
       :initial-is-followed="isFollowed"
      />  

      <div class="row">
        <div class="col-md-4">
          <UserFollowingsCard :followings="followings" />
          <br />
          <UserFollowersCard :followers="followers" />
        </div>
        <div class="col-md-8">
          <UserCommentsCard :comments="comments" />
          <br />
          <UserFavoritedRestaurantsCard :favoritedRestaurants="favoritedRestaurants" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserProfileCard from './../components/UserProfileCard'
import UserFollowingsCard from './../components/UserFollowingsCard'
import UserFollowersCard from './../components/UserFollowersCard'
import UserCommentsCard from './../components/UserCommentsCard'
import UserFavoritedRestaurantsCard from './../components/UserFavoritedRestaurantsCard'
import usersAPI from './../apis/users'
import {Toast} from './../utils/helpers'
import {mapState} from 'vuex'

export default {
  components: {
    UserProfileCard,
    UserFollowingsCard,
    UserFollowersCard,
    UserCommentsCard,
    UserFavoritedRestaurantsCard
  },
  data() {
    return {
      user: {
        id: 0,
        name: '',
        email: '',
        commentsNum: 0,
        favoritedRestaurantsNum: 0,
        followersNum: 0,
        followingsNum: 0,
      },
      isFollowed: false,
      followings: [],
      followers: [],
      comments: [],
      favoritedRestaurants: []
    }
  },
  // 將資料從 Vuex 取出
  computed: {
    ...mapState(['currentUser'])
  },
  created() {
    // 從路由取得使用者 id，並呼叫方法
    const {id} = this.$route.params
    this.fetchUser(id)
  },
  // 在 beforeRouteUpdate 時要再重新取得使用者資料
  beforeRouteUpdate(to, from, next) {
    const {id} = to.params
    this.fetchUser(id)
    next()
  },
  methods: {
    async fetchUser(userId) {
      try {
        const response = await usersAPI.get({userId})
        // console.log('response', response)
        
        const {data, statusText} = response
        const {profile, isFollowed} = data
        
        if (statusText !== 'OK') {
          throw new Error(statusText)
        }
        // 將usersAPI取得的資料帶入 Vue中
        this.user = {
          ...this.user,
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.image,
          commentsNum: profile.Comments.length,
          favoritedRestaurantsNum: profile.FavoritedRestaurants.length,
          followersNum: profile.Followers.length,
          followingsNum: profile.Followings.length,
        }
        this.isFollowed = isFollowed
        this.followings = profile.Followings
        this.followers = profile.Followers
        this.favoritedRestaurants = profile.FavoritedRestaurants
        // 處理 comment.Restaurant 可能有空值的情況
        this.comments = profile.Comments.filter(comment => comment.Restaurant)
      } catch (error) {
        Toast.fire({
          icon: 'warning',
          title: '無法成功取得個人資料，請稍後再試'
        })
      }
    }
  }  
}
</script>
