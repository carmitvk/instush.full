<template>
  <section class="user-profile">
    <div class="user-profile-container">
      <div v-if="isLoading" class="loading">
        <img class="loading-gif" src="@/assets/img/reg-loading.gif" />
      </div>
      <div v-else class="user-all-data">
        <div class="creator" v-if="fullLoggedInData">
          <img class="creator-img" :src="fullLoggedInData.imgUrl" alt="image" />
          <div class="user-data">
            <div>
              <span>{{ fullLoggedInData.username }}</span>
              <!-- <button>Edit Profile</button> -->
            </div>
            <div class="counters-container">
              <span>
                <span class="num">{{ loggedUserPostis.length }}</span>
                <span class="num-title">posts</span>
              </span>
              <span @click="openFollowersModal" class="cursor">
                <span class="num">{{ followersCount }}</span>
                <span class="num-title">followers</span>
              </span>
              <span @click="openFollowingModal" class="cursor">
                <span class="num">{{ followingCount }}</span>
                <span class="num-title">following</span>
              </span>
            </div>
            <user-list
              @dialogClosed="dialogClosed"
              :dialogVisible="dialogVisible"
              :users="users"
              :dialogTitle="title"
            >
            </user-list>
            <div class="full-name">
              {{ fullLoggedInData.fullname }}
            </div>
          </div>
        </div>

        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          :collapse-transition="true"
        >
          <el-menu-item index="1">
            <svg aria-label="Posts" class="posts-svg" fill="#262626" height="12" viewBox="0 0 48 48" width="12"><path clip-rule="evenodd" 
              d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 
              14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 
              28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z" fill-rule="evenodd"></path></svg>
            <span>POSTS</span>
          </el-menu-item>

          <el-menu-item index="2">
            <svg aria-label="Saved" class="saved-svg" fill="#8e8e8e" height="12" viewBox="0 0 48 48" width="12"><path d="M43.5 48c-.4 
            0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 
            .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path></svg>
            <span>SAVED</span>
          </el-menu-item>
        </el-menu>
        <!-- <div class="grid-container"> -->
        <div v-if="activeIndex === '1'" class="posti-card-list card-grid">
          <posti-card
            v-for="(loggedUserPosti, index) in loggedUserPostis"
            :key="index"
            :posti="loggedUserPosti"
          ></posti-card>
        </div>

        <div v-if="activeIndex === '2'" class="posti-card-list card-grid">
          <posti-card
            v-for="(savedUserPosti, index) in savedUserPostis"
            :key="index"
            :posti="savedUserPosti"
          ></posti-card>
        </div>
        <!-- </div> -->

      </div>
    </div>
  </section>
</template>

<script>
import userList from "@/cmps/user-list";
import postiCard from "@/cmps/posti-card";

export default {
  name: "userProfile",
  data() {
    return {
      dialogVisible: false,
      users: null,
      title: "",
      activeIndex: "1",
    };
  },
  computed: {
    fullLoggedInData() {
      return this.$store.getters.fullUserData;
    },

    loggedUserPostis() {
      return this.$store.getters.postis.filter((posti) => {
        return posti.creator?._id === this.fullLoggedInData?._id;
      });
    },

    savedUserPostis() {
      return this.$store.getters.postis.filter((posti) => {
        return (
          // posti.creator?._id === this.fullLoggedInData?._id &&
          posti.isSaved === true
        );
      });
    },

    followersCount() {
      return this.fullLoggedInData?.followers?.length;
    },
    followingCount() {
      return this.fullLoggedInData?.following?.length;
    },
    isLoading() {
      return this.$store.getters.loading;
    },
    listUsers() {
      return this.listUsers;
    },
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log("index, indexPath", key, keyPath);
      this.activeIndex = key;
    },

    openFollowersModal() {
      this.title = "Followers";
      this.users = this.fullLoggedInData?.followers;
      this.dialogVisible = true;
    },

    openFollowingModal() {
      this.title = "Following";
      this.users = this.fullLoggedInData?.following;
      this.dialogVisible = true;
    },

    dialogClosed() {
      this.dialogVisible = false;
    },
  },
  created() {
    //   this.$store.dispatch({type:'loadUsers'});
    this.$store.dispatch({
      type: "setFullUserData",
      userId: this.$route.params.userId,
    });
  },
  components: {
    userList,
    postiCard,
  },
};
</script>