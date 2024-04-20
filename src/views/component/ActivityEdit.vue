<!-- template -->
<template>
  <el-drawer v-model="visibleDraw"
             :title="formModel.eventid ? '编辑活动' :'添加活动'"
             size="40%"
  >
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="活动名称" prop="eventname" style="margin-left: 10px; margin-right: 10px;">
        <el-input v-model="formModel.eventname" placeholder="请输入活动名称"></el-input>
      </el-form-item>
      <el-form-item label="活动日期" prop="eventtime" style="margin-left: 10px; margin-right: 10px;">
        <el-date-picker
            v-model="formModel.eventtime"
            type="datetime"
            placeholder="请选择活动日期"
            style="width: 100%"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="起飞机场" prop="dep" style="margin-left: 10px; margin-right: 10px;">
        <el-input v-model="formModel.dep" placeholder="请输入起飞机场"></el-input>
      </el-form-item>
      <el-form-item label="到达机场" prop="arr" style="margin-left: 10px; margin-right: 10px;">
        <el-input v-model="formModel.arr" placeholder="请输入到达机场"></el-input>
      </el-form-item>
      <el-form-item label="航路" prop="eventroute" style="margin-left: 10px; margin-right: 10px;">
        <el-input v-model="formModel.eventroute" placeholder="请输入航路"></el-input>
      </el-form-item>
      <el-form-item label="附加信息" prop="eventinfo" style="margin-left: 10px; margin-right: 10px;">
        <el-input v-model="formModel.eventinfo" placeholder="请输入附加信息"></el-input>
      </el-form-item>
      <el-form-item><el-button @click="onPublish" type="primary" style="margin-left: 230px; margin-right: 10px;">发布</el-button>
        </el-form-item>
      </el-form>
  </el-drawer>
</template>

<!-- script -->
<script setup>
import { ref, defineExpose } from "vue";
import {ActivityPublish,ActivityDetail,updateEvent} from "@/api/ActivityControl";

const visibleDraw = ref(false);

//默认数据
const defaultForm ={
  eventid:'',
  eventname:'',//活动名称
  eventtime:'',//活动日期
  dep:'',//起飞机场
  arr:'',//到达机场
  eventroute:'',//航路
  eventinfo:'',//附加信息
}

//数据
let formModel=ref({...defaultForm});

const emit=defineEmits(['success'])
const onPublish= async ()=>{
  if(formModel.value.eventid){
    //编辑
    await updateEvent(formModel.value)
    visibleDraw.value=false
    emit('success','edit')
  }else{
    //添加
    await ActivityPublish(formModel.value);
    visibleDraw.value=false
    emit('success','add')
  }
}


const open = async (row) => {
  visibleDraw.value = true;
  if(row.eventid){
    //这里编辑 基于row.id 发送请求
    const res= await ActivityDetail(row.eventid)
    formModel.value=res
  }else{
    formModel.value={...defaultForm }
  }
};

defineExpose({
  open,
});
</script>

<!-- style -->
<style scoped lang="scss">

</style>
