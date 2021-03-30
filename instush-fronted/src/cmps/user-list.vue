<template>
  <div class="user-list">
    <el-dialog
      width="25%"
      center
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :before-close="dialogClosed"
    >
      <div class="list-user" v-for="user in users" :key="user._id">
        <img class="user-img" :src="user.imgUrl" alt="image" />
        <span class="user-name">{{ user.fullname }}</span>
        <!-- <button class="follow-btn">Follow</button> -->
        <el-button type="primary" :loading="false">Follow</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "userList",
  props: {
    users: {
      type: Array,
    },
    dialogVisible: {
      type: Boolean,
    },
    dialogTitle: {
      type: String,
    },
  },
  methods: {
    dialogClosed() {
        this.$emit("dialogClosed");
    },
  },
};
</script>