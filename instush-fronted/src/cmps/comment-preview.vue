<template>
    <section class="comment-preview">
        <div class="full-user-name">
            <span class="commented-user" @hover="openModalUser(comment.by)">{{ comment.by.fullname }}</span>
            <span>{{ comment.txt }}</span>
        </div>
        <div class="liked">
            <img v-if="isLikeComment" @click="changeCommentLike" class="comment-like" src="../assets/img/red-hart.svg" alt="image" />
            <img v-else @click="changeCommentLike" class="comment-like" src="../assets/img/white-hart.svg" alt="image" />
        </div>
    </section>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
    },
  },
  data(){
      return{            
      }
  },
  methods:{
    openModalUser(user){ //TODO - or pass id
      console.log('openModalUser for userId=',user)
    },
    changeCommentLike(){
      this.$emit('changeCommentLike', this.comment);
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
    isLikeComment(){  //my id in likedBy
      var isIdFound = this.comment?.likedBy?.find((likedUser) => {
        return likedUser._id === this.loggedInUser._id;
      });
      return (!isIdFound) ? false : true;
    }
  },
};
</script>