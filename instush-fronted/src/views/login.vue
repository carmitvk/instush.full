<template>
  <div class="login">
    <div class="login-data">
      <p>{{ msg }}</p>
      <div  class="loggedin-user-show" v-if="loggedinUser">
        <h3>
          Loggedin User:
          {{ loggedinUser.username }}
        </h3>
        <button class="btn logout-btn" @click="doLogout">Logout</button>
      </div>
      <div v-else class="loggedin-signup">
        <form class="doLogin">
          <h2>Login</h2>
          <input class="txt-holder" type="text" v-model="loginCred.username" placeholder="User name"/>
          <input class="txt-holder" type="text" v-model="loginCred.password" placeholder="Password" />
          <el-button class="btn" @click="doLogin" type="primary">Login</el-button>
        </form>

        <form class="signup">
          <h2>Signup</h2>
          <input class="txt-holder" type="text" v-model="signupCred.fullname" placeholder="Your full name"/>
          <input class="txt-holder" type="text" v-model="signupCred.username" placeholder="Username"/>
          <input class="txt-holder" type="text" v-model="signupCred.password" placeholder="Password"/>
          <img class="picture" v-if="signupCred.imgUrl" :src="signupCred.imgUrl" alt="image"/>
          <input btn class="input-file" placeholder="Upload file" type="file" id="imgUploader" @change="onUploadImg" />
          <el-button class="btn" type="primary" @click="doSignup" :loading="btnPressed">Signup</el-button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadImg } from "../services/img-upload.service.js";

export default {
  name: "test",
  data() {
    return {
      msg: "",
      loginCred: {username: 'guest', password: 'guest'},
      signupCred: {username: '', password: '', fullname: ''},
      isLoading: false,
      btnPressed:false,
    };
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
  },
  created() {
  },
  methods: {
    async doLogin() {
      if (!this.loginCred.username) {
        this.msg = "Please enter username/password"
        return;
      }
      try {
        await this.$store.dispatch({ type: "login", userCred: this.loginCred });
        this.$router.push('/')
      } catch(err) {
          console.log(err)
          this.msg = "Failed to login"
      }
    },
    doLogout() {
      this.$store.dispatch({ type: "logout" });
    },
    async doSignup() {
      console.log('inside doSignup')
      if (!this.signupCred.fullname || !this.signupCred.password || !this.signupCred.username) {
        this.msg = "Please fill up the form"
        return
      }
      console.log('this.signupCred.imgUrl=',this.signupCred.imgUrl)
      // if (this.signupCred.imgUrl && !this.btnPressed){
        if (!this.signupCred.imgUrl){
          this.signupCred.imgUrl = 'http://res.cloudinary.com/carmitvk/image/upload/v1617535367/pic7_jcwwpa.jpg';
        }
        await this.$store.dispatch({ type: "signup", userCred: this.signupCred });
        this.$router.push('/');
        this.signupCred.imgUrl='';
      // }
    },

    async removeUser(userId) {
      try {
        await this.$store.dispatch({ type: "removeUser", userId })
        this.msg = 'User removed'
      } catch(err) {
        this.msg = 'Failed to remove user'
      }
    },

    async onUploadImg(ev) {
      try{
          this.btnPressed = true;
          this.isLoading = true
          const res = await uploadImg(ev)
          this.signupCred.imgUrl = res.url
          this.btnPressed = false;
      }catch(err){
          console.log('postiEdit: Cannot save posti...', err);
          throw new Error('Cannot save posti...');
      }finally{
          this.isLoading = false
      }
    },
  }
};
</script>