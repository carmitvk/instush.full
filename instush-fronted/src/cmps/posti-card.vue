<template>
  <section class="posti-card">
    <img class="card-image" :src="posti.imgUrl" />
    <div class="card-data">
        <span class="likes-container">
            <span class="like-count">{{ likesCount }}</span>
            <!-- <img class="like-icon" src="../assets/img/white-hart-full.svg"/> -->
             <font-awesome-icon icon="heart" class="like-icon"/>
        </span>
        <div class="tags-list">
            <div  v-for="(tag, index) in tags" :key="index" class="tag">{{ tag }}</div>
        </div>
    </div>
  </section>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart } from '@fortawesome/free-solid-svg-icons'


library.add(faHeart)

export default {
  name: "posti-card",
  props: {
    posti: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  computed: {
    likesCount() {
      return this.posti.likedBy.length;
    },
    tags() {
      return this.posti.tags;
    },
  },
};
</script>