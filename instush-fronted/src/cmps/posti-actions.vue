<template>
    <el-dialog
      class="posti-actions"
      width="40%"
      center
      :show-close="false"
      :visible.sync="dialogVisible"
      :before-close="dialogClosed"
    >
           <div @click="removePosti">Delete</div>
           <div class="dialogClosed" @click="dialogClosed">Cancel</div>


    </el-dialog>
</template>

<script>
export default {
    name: "postiActions",
    props: {
        posti: {
        type: Object,
        },
        dialogVisible: {
        type: Boolean,
        },
    },
   data() {
        return {
        }
    },
    methods: {
        dialogClosed() {
            this.$emit("dialogClosed");
        },
        removePosti(){
            this.$emit('removePosti', this.posti._id);
            this.$router.push('/')  
        }
    },
    computed: {
    },
    created() {
    },
   components: {
  }, 
}
</script>