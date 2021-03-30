<template>
  <section class="messanger">
    <div class="messanger-container">

      <div class="users-container">
          <div class="users" :class="{ active: user===selectedUser }"  v-for="user in users" :key="user._id" @click="userPicked(user)">
            <div class="users-data">
              <img class="user-img" :src="user.imgUrl" alt="image" />
              <div>
                <span class="user-name">{{ user.fullname }}</span>
                <!-- <span class="user-name">{{ user.fullname }}<el-badge class="mark" :value="unreadMsg" /></span> -->
                <div v-if="typers.includes(user._id)" class="is-typing">Typing...</div>
              </div>
            </div>
          </div>
      </div>
      <div class="editor">
        <div class="messages-container" id="messanger"> 
          <div class="show-msg" :class="{ mymsg: chatMsg.fromId === loggedinUser._id }" v-for="chatMsg in chatMsgs" :key="chatMsg.id" >
            <span class="from-user">{{chatMsg.from}}</span>
            <span v-if="chatMsg.type==='txt'">{{chatMsg.content}}</span>
            <span v-if="chatMsg.type==='img'"><img :src="chatMsg.content" alt="image" />></span>
            <div class="duration">{{createdAt(chatMsg)}}</div>
          </div>
        </div>
        <div>
          <span aria-label="Direct" class="glyphsSpriteDirect__outline__96 u-__7"></span>
        </div>
        <div class="write-msg">
          <div class="wrapper">
            <textarea 
              v-if="selectedUser" 
              @input="debounce"
              class="regular-input"
              v-model="msg.content"
              style="resize: none"
              placeholder="Message..."
            ></textarea>

            <emoji-picker v-if="selectedUser" @emoji="append" :search="search">
              <div
                class="emoji-invoker"
                slot="emoji-invoker"
                slot-scope="{ events: { click: clickEvent } }"
                @click.stop="clickEvent"
              >
                <svg
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
                  />
                </svg>
              </div>
              <div slot="emoji-picker" slot-scope="{ emojis, insert }">
                <div class="emoji-picker">
                  <div class="emoji-picker__search">
                    <input type="text" v-model="search" v-focus />
                  </div>
                  <div>
                    <div
                      v-for="(emojiGroup, category) in emojis"
                      :key="category"
                    >
                      <h5>{{ category }}</h5>
                      <div class="emojis">
                        <span
                          v-for="(emoji, emojiName) in emojiGroup"
                          :key="emojiName"
                          @click="insert(emoji)"
                          :title="emojiName"
                          >{{ emoji }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </emoji-picker>
          </div>
          <!-- <i class="el-icon-picture-outline" v-if="isDisabled && selectedUser"><input btn class="input-file" type="file" id="imgUploader" @change="onUploadImg" /></i> -->
          <button @click="sendMsg" :disabled="isDisabled" class="send">
            Send
          </button>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import { uploadImg } from "../services/img-upload.service.js";
import moment from "moment";

export default {
  data() {
    return {
      msg: {
        type: "txt",
        content: "",
      },
      search: "",
      selectedUser: null,
      timerId: null,
      unreadMsg: 0,
    };
  },
  computed: {
    // unreadMsg(){
    //   if (this.selectedUser!== msg.fromId )
    //     this.unreadMsg++;
    //   return this.unreadMsg;
    // },
    typers(){
      return this.$store.getters.typers;
    },
    users() {
      return this.$store.getters.users?.filter((user)=>{
        return user._id !== this.loggedinUser._id;
      });
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    chatMsgs() {
       var messages = this.$store.getters.chatMsgs.filter((chatMsg)=>{
        if(this.selectedUser && this.loggedinUser){
          var selectedUserId = this.selectedUser._id
          var currentUserId = this.loggedinUser._id
        return ((chatMsg.toId === selectedUserId || chatMsg.toId === currentUserId) && 
               (chatMsg.fromId === selectedUserId || chatMsg.fromId === currentUserId))
        }
      });
      return messages
    },
    isDisabled() {
      return this.msg.content.length === 0;
    },
  },
  methods: {
    sendMsg() {
      var message = JSON.parse(JSON.stringify(this.msg))
      message.toId = this.selectedUser._id;
      this.$store.dispatch({type:'sendMsg', message});
      this.msg.content = "";
      this.msg.type = "txt";
    },
    createdAt(message) {
      return moment(message.createdAt).fromNow();
    },
    append(emoji) {
      this.msg.content += emoji;
      this.msg.type = "txt";
    },
    async onUploadImg(ev) {
      try {
        this.btnPressed = true;
        this.isLoading = true;
        const res = await uploadImg(ev);
        this.msg.content = res.url;
        this.msg.type = "img";
        this.btnPressed = false;
      } catch (err) {
        console.log("onUploadImg: Cannot upload picture...", err);
        throw new Error("Cannot upload picture...");
      } finally {
        this.isLoading = false;
      }
    },
    userPicked(user){
      this.selectedUser=user;
      this.msg.content='';
    },
    debounce() {
      clearTimeout(this.timerId);
      this.timerId = setTimeout(() => {
        this.$store.dispatch({type:'userTyping', data: {
                              fromId :this.loggedinUser._id, 
                              toId :this.selectedUser._id
                              }})
      }, 500);
    },
  },
  created() {
    this.$store.dispatch({ type: "initListeners" });
    this.$store.dispatch({type:'setUserId' , 
                          data: {userId :this.loggedinUser._id, 
                          fullname: this.$store.getters.loggedinUser.fullname}})
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      },
    },
  },
  // watch: {
  //   chatMsgs: function () {
  //     var div = document.getElementById("messanger");
  //     if(div){
  //       var delta = div.scrollHeight - div.clientHeight;
  //       console.log('delta', delta);
  //       div.scrollTop = div.scrollHeight;
  //     }
  //   },
  // },
};
</script>