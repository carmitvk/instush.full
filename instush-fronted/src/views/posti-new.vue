<template>
<div class="posti-new" >
    <el-dialog
      width="60%"
      center
      :title="title"
      :visible.sync="dialogVisible"
      :before-close="dialogClosed"
    >
       <section v-if="postiToEdit" >
        <form>
            <textarea class="description" placeholder=" Write your desceiption here..." name="description" rows="3" cols="100" v-model="postiToEdit.description"></textarea>

            <el-select
                class="tags-picker"
                v-model="postiToEdit.tags"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="Pick tags for post">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>

            <img class="picture" v-if="postiToEdit.imgUrl" :src="postiToEdit.imgUrl" alt="image"/>
            <input btn class="input-file" placeholder="Upload file" type="file" id="imgUploader" @change="onUploadImg" />

            <el-button class="btn" @click="save" type="primary" :loading="btnPressed">Save</el-button>

        </form>
      </section>


    </el-dialog>
    </div>
</template>

<script>

import {postiService} from '../services/posti.service.js'
import { uploadImg } from "../services/img-upload.service.js";

export default {
    name: "postiNew",
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
   data() {
        return {
            postiToEdit: null,
            isLoading: false,
            btnPressed:false,
            
            options: [{
                value: 'Nature',
                label: 'Nature'
            }, {
                value: 'Animals',
                label: 'Animals'
            }, {
                value: 'Funny',
                label: 'Funny'
            }],
        }
    },
    methods: {
        save() {
            if (this.postiToEdit.imgUrl && !this.btnPressed){
                this.$store.dispatch({ type: 'savePosti', posti:this.postiToEdit })
                this.dialogClosed();
                this.postiToEdit = postiService.getEmptyPosti();
            }else{
                console.log('NewPosti: Cannot add post. pick a picture first and wait for loading.');
            }
        },

        dialogClosed() {
            this.$emit("dialogClosed");
        },

        async onUploadImg(ev) {
            try{
                this.btnPressed = true;
                this.isLoading = true
                const res = await uploadImg(ev)
                this.postiToEdit.imgUrl = res.url
                this.btnPressed = false;
            }catch(err){
                console.log('postiEdit: Cannot save posti...', err);
                throw new Error('Cannot save posti...');
            }finally{
                this.isLoading = false
            }
        },

        // handleRemove(file, fileList) {
        //     console.log(file, fileList);
        // },

        // handlePreview(file) {
        //     console.log(file);
        // }
    },
    computed: {
        imgUrl(){
            return this.postiToEdit.imgUrl
        },
        title() {
            // return 'Posti Add'
            return 'Add your own post'
        },
        postiId() {
            return this.$route.params.postiId
        }
    },
    created() {
        this.postiToEdit = postiService.getEmptyPosti();
    },
   components: {
  }, 
}
</script>