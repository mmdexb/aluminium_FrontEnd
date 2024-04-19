<script setup>
import {ref, onMounted} from 'vue';
import {ActivityList} from '@/api/ActivityControl';


const activitys = ref({

});

const getActivitylist =async ()=>{
  let params={
    page: "1",
    pageSize: "5",
  }
  let result= await Activitylist(params)
  activitys.value=result.data.rows;
}
getActivitylist();

</script>

<template>
  <el-table :data="activitys" stripe style="width: 100%" >
    <el-table-column prop="eventname" label="活动名称" width="180"/>
    <el-table-column prop="eventtime" label="活动日期" width="180"/>
    <el-table-column prop="dep" label="起飞机场" width="180"/>
    <el-table-column prop="arr" label="到达机场" width="180"/>
    <el-table-column prop="eventroute" label="航路" width="180"/>
    <el-table-column prop="eventinfo" label="附加信息"/>
  </el-table>
</template>


<style scoped lang="scss">
/* 样式代码 */
</style>
