<template>
  <section class="posti-preview">
    <div>
      <div class="creator-container">
        <div class="user-details">
          <img class="creator-img" :src="posti.creator.imgUrl" alt="image" />
          <span class="name">{{ posti.creator.fullname }}</span>
        </div>
        <span class="actions" @click="openPostActions">
          <svg aria-label="More options" class="_8-yf5 " fill="#262626" height="16" viewBox="0 0 48 48" width="16"><circle clip-rule="evenodd" cx="8" cy="24" fill-rule="evenodd" r="4.5"></circle><circle clip-rule="evenodd" cx="24" cy="24" fill-rule="evenodd" r="4.5"></circle><circle clip-rule="evenodd" cx="40" cy="24" fill-rule="evenodd" r="4.5"></circle></svg>  
        </span>
      </div>
      <div class="post-img">
        <img :src="posti.imgUrl" alt="image" />
      </div>
      <div class="about-post">

          <div class="actions">
            <div class="like-and-comment">
              <img class="like-posti" @click="changeLike" v-if="isLikePosti" src="../assets/img/red-hart.svg" alt="image" />
              <img class="like-posti" @click="changeLike" v-else src="../assets/img/white-hart.svg" alt="image" />
              <img class="all-comments" src="../assets/img/speech-bubble.svg" alt="comment image" @click="openPostiDetails"/>
            </div>

            <div class="save-posti-container"> 
              <img class="save-posti" v-if="isSaved" @click="changeSaved" src="../assets/img/bookmark-black.svg" alt="image" />
              <img class="save-posti" v-else @click="changeSaved" src="../assets/img/bookmark-white.svg" alt="image" />
            </div>
          </div>

          <div class="likes-num" @click="openLikesModal">
            <span>{{ postiLikesCount }}</span>
          </div>
          <user-list @dialogClosed="dialogClosed" :dialogVisible="likesDialogVisible" :users="posti.likedBy" 
                      dialogTitle="Likes">
          </user-list>

          
          <comment-list @changeCommentLike="changeCommentLike" :posti="posti" />
          <div class="duration">{{ createdAt }}</div>
          <div class="add-comment-container">
            <div class="wrapper">
            <textarea class="regular-input" v-model="txt" style="resize: none;"
              placeholder="Add a comment..."></textarea>

              <emoji-picker @emoji="append" :search="search">
                <div class="emoji-invoker"
                  slot="emoji-invoker"
                  slot-scope="{ events: { click: clickEvent } }"
                  @click.stop="clickEvent"
                >
                  <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h24v24H0z" fill="none">
                    </path><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                  </svg>

                </div>
                <div slot="emoji-picker" slot-scope="{ emojis, insert }">
                  <div class="emoji-picker">
                    <div class="emoji-picker__search">
                      <input type="text" v-model="search" v-focus>
                    </div>
                    <div>
                      <div v-for="(emojiGroup, category) in emojis" :key="category">
                        <h5>{{ category }}</h5>
                        <div class="emojis">
                          <span
                            v-for="(emoji, emojiName) in emojiGroup"
                            :key="emojiName"
                            @click="insert(emoji)"
                            :title="emojiName"
                          >{{ emoji }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </emoji-picker>
            </div>
              <button @click="postComment" :disabled="isDisabled" class="post">Post</button>
          </div>
          
      </div>
    </div>

    <posti-actions @removePosti="removePosti" @dialogClosed="actionsDialogClosed" :dialogVisible="postiActionsVisible" :posti="posti">
    </posti-actions>

  </section>
</template>

<script>
import userList from './user-list'
import {postiService} from "../services/posti.service.js";
import moment from "moment";
import commentList from './comment-list'
import postiActions from './posti-actions'
import EmojiPicker from 'vue-emoji-picker'
//npm i v-emoji-picker  //npm i vue-emoji-picker --save

export default {
  props: {
    posti: {
      type: Object,
    },
  },
  data() {
    return {
      txt: '',
      search:'',
      timerId: null,
      likesDialogVisible: false,
      postiActionsVisible: false,
    };
  },
  methods: {
    openLikesModal() { 
      this.likesDialogVisible = true;
    },
    dialogClosed(){
      this.likesDialogVisible=false
    },
    openPostActions(){
      this.postiActionsVisible = true;
    },
    removePosti(postiId){
      this.$emit('removePosti', postiId);
    },
    actionsDialogClosed(){
      this.postiActionsVisible=false
    },
    openPostiDetails(){

    },
    postComment(){
      const comment = postiService.getEmptyComment(this.txt);
      console.log('post a comment',this.txt);
      this.$emit('addComment', {posti:this.posti,comment:comment});
      this.txt='';
    },
    append(emoji) {
      this.txt += emoji
    },
    changeLike(){
      this.$emit('changeLike', this.posti);
    },
    changeSaved(){
      this.$emit('changeSaved', this.posti);
    },
    changeCommentLike(comment){
      this.$emit('changeCommentLike', {posti:this.posti,comment:comment});
    }
  },
  computed: {

    isSaved() {
      return this.posti.isSaved; 
    },

    isLikePosti() {
      var isIdFound = this.posti.likedBy.find((like) => {
        return like._id === this.$store.getters.loggedinUser?._id;
      });
      return !!isIdFound   // undefined will be false
    },

    isDisabled(){
        return this.txt.length === 0;
    },
    postiLikesCount() {
      var counter = this.posti.likedBy.length;
      return `${counter} likes`;
    },
    createdAt() {
      return moment(this.posti.createdAt).fromNow().toUpperCase();
    },
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus()
        console.log('inserted')
      },
    },
  },
    components: {
    commentList,
    EmojiPicker,
    userList,
    postiActions,
  },
};
</script>