<script setup>
import {
  Edit,
  Delete
} from '@element-plus/icons-vue'

import { ref } from 'vue'
import {Userlist} from '@/api/UserControl'
import {userDelete} from "@/api/UserControl";
import {ElMessage} from "element-plus";
import UserEdit from "@/views/component/UserEdit.vue";

//用户列表数据模型
const users = ref([

])

const userEditRef = ref(null)

const onAddUser = () => {
  userEditRef.value.openuser({})
  getUserlist();
}
defineExpose({
  onAddUser,
});

const onEditUser = (rows) => {
  userEditRef.value.openuser(rows)
  getUserlist();
}

const onDeleteUser = async (row) => {
  try{
    await userDelete({cid:row.cid});
    await getUserlist();
  }catch(error){
    console.log(error)
    ElMessage.error('删除失败');
  }
}

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(10)//每页条数

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
  pageSize.value = size
  getUserlist();
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
  pageNum.value = num
  getUserlist();
}
//调用接口
const getUserlist =async ()=>{
  let params={
    page: pageNum.value,
    pageSize: pageSize.value,
  }
  let result= await Userlist(params)
  users.value=result.data.rows;
  total.value=result.data.total;
}

const onuserSuccess =(type) =>{
  getUserlist();
}
getUserlist();


</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>用户管理</span>
        <div class="extra">
          <el-button type="primary"  @click="onAddUser" >添加用户</el-button>
        </div>
      </div>
    </template>

    <el-table :data="users" style="width: 100%">
      <el-table-column label="用户CID" width="200" prop="cid"></el-table-column>
      <el-table-column label="用户真实姓名"  width="300" prop="realname"></el-table-column>
      <el-table-column label="用户邮箱" prop="email"> </el-table-column>
      <el-table-column label="用户等级" prop="level"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <!-- //row代表数组的每一项 -->
          <el-button :icon="Edit" @click="onEditUser(row)"  circle plain type="primary"></el-button>
          <el-button :icon="Delete" @click="onDeleteUser(row)" circle plain type="danger"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <!-- 分页条 -->
    <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[3, 5 ,10, 15]"
                   layout="jumper, total, sizes, prev, pager, next" background :total="total" @size-change="onSizeChange"
                   @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end" />
  </el-card>
  <user-edit ref="userEditRef" @success="onuserSuccess">

  </user-edit>
</template>
<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>