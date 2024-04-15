<script setup>
import { ref } from 'vue'
import {Activitylist} from '@/api/ActivityControl'


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

</template>

<style scoped lang="scss">

</style>