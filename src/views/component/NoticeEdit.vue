<!-- template -->
<template>
  <el-drawer v-model="visibleDrawNotice"
             :title="formModelNotice.nid ? '编辑公告' :'添加公告'"
             size="40%"
  >
    <el-form :model="formModelNotice" ref="formRef" label-width="100px">
      <el-form-item label="公告名称" prop="title" style="margin-left: 10px; margin-right: 10px;">
        <el-input v-model="formModelNotice.title" placeholder="请输入公告名称"></el-input>
      </el-form-item>
      <el-form-item label="公告日期" prop="time" style="margin-left: 10px; margin-right: 10px;">
        <el-date-picker
            v-model="formModelNotice.time"
            type="datetime"
            placeholder="请选择公告日期"
            style="width: 100%"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="作者" prop="author" style="margin-left: 10px; margin-right: 10px;">
        <el-input v-model="formModelNotice.author" placeholder="请输入作者名称"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content" style="margin-left: 10px; margin-right: 10px;">
        <el-input v-model="formModelNotice.content" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item><el-button @click="onPublishNotice" type="primary" style="margin-left: 230px; margin-right: 10px;">发布</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<!-- script -->
<script setup>
import { ref, defineExpose } from "vue";
import {NoticePublish,NoticeDetail,updateNotice} from "@/api/Notice";

const visibleDrawNotice = ref(false);
// ref包裹的元素需要.value其他不用

//默认数据
const defaultFormNotice ={
  nid:'',
  title:'',
  time:'',
  author:'',
  content:'',
}

//数据
let formModelNotice=ref({...defaultFormNotice});

const emit=defineEmits(['success'])
const onPublishNotice= async ()=>{
  if(formModelNotice.value.nid){
    //编辑
    await updateNotice(formModelNotice.value)
    visibleDrawNotice.value=false
    emit('success','edit')
  }else{
    //添加
    await NoticePublish(formModelNotice.value);
    visibleDrawNotice.value=false
    emit('success','add')
  }
}


const openNotice = async (row) => {
  console.log('row',row)
  visibleDrawNotice.value = true;
  if(row.nid){
    //这里编辑 基于row.id 发送请求
    console.log('进来')
    const ressss= await NoticeDetail(row.nid)
    formModelNotice.value=ressss.data
  }else{
    formModelNotice.value={...defaultFormNotice }
  }
};

defineExpose({
  openNotice,
});
</script>

<!-- style -->
<style scoped lang="scss">

</style>
