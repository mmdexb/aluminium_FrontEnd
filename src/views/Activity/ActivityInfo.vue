<script setup>
import {ref} from 'vue';
import {ActivityList} from '@/api/ActivityControl';
const imageUrl = [
  {url: "https://img2.imgtp.com/2024/04/22/FDvY022h.jpg"},
  {url:"https://img2.imgtp.com/2024/04/22/SJppHiev.jpg"},
  {url: "https://img2.imgtp.com/2024/04/22/nS6kzhTG.jpg"},
  {url: "https://img2.imgtp.com/2024/04/22/3XbL57ph.jpg"},
];

const activitys = ref({});

const getActivitylist =async ()=>{
  let params={
    page: "1",
    pageSize: "5",
  }
  let result= await ActivityList(params)
  activitys.value=result.data.rows;
}
getActivitylist();
</script>

<template>
  <el-carousel  type="card">
        <el-carousel-item v-for="item in imageUrl" :key="item">
          <img :src="item.url" alt=""/>
        </el-carousel-item>
  </el-carousel>
  <br>
  <br>
  <el-table :data="activitys" stripe style="width: 100%" >
    <el-table-column prop="eventname" label="活动名称" width="180"/>
    <el-table-column prop="eventtime" label="活动日期" width="180"/>
    <el-table-column prop="dep" label="起飞机场" width="180"/>
    <el-table-column prop="arr" label="到达机场" width="180"/>
    <el-table-column prop="eventroute" label="航路"/>
    <el-table-column prop="eventinfo" label= "附加信息"/>
  </el-table>
</template>

<style scoped>
.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}



</style>
