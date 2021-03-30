<template>
  <div class="posti-list">
    <div class="posti-list-container" v-for="posti in postis" :key="posti._id" >
      <posti-preview @removePosti="removePosti" @addComment="addComment" @changeCommentLike="changeCommentLike" @changeLike="changeLike(posti)" @changeSaved="changeSaved(posti)" :posti="posti" />
    </div>
  </div>
</template>

<script>
import postiPreview from './posti-preview'

export default {
  name: "postiList",
  props: {
    postis: {
      type: Array,
    },
  },

  methods:{
    changeLike(posti){
      this.$emit('changeLike', posti);
    },
    changeSaved(posti){
      this.$emit('changeSaved', posti);
    },
    changeCommentLike(data){
      this.$emit('changeCommentLike', data);
    },
    addComment(data){
      this.$emit('addComment', data);
    },
    removePosti(postiId){
      this.$emit('removePosti', postiId);
    },
  },
  components: {
    postiPreview,
  },
};
</script>