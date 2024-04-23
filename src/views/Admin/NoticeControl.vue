<script setup>
import { ref } from 'vue';
import { NoticeList,NoticeDelete } from '@/api/Notice';
import { Edit, Delete } from '@element-plus/icons-vue';
import   NoticeEdit  from "@/views/component/NoticeEdit.vue";
import {ElMessage} from "element-plus";

// 活动列表数据模型
const notices = ref([]);
// 分页条数据模型
const pageNum = ref(1); // 当前页
const total = ref(20); // 总条数
const pageSize = ref(10); // 每页条数


const noticeEditRef = ref(null)
//添加
const onAddNotice = () =>{
  noticeEditRef.value.openNotice({})
  getNoticeList();
}
defineExpose({
  onAddNotice,
});

const onEditNotice = (row) => {
  noticeEditRef.value.openNotice(row)
  getNoticeList();
}

const onDeleteNotice = async (row) => {
  console.log('row',row);
  try {
    await NoticeDelete({id:row.nid});
    await getNoticeList();
  } catch (error) {
    console.error('Failed to delete Notice', error);
    ElMessage.error('删除失败');
  }
};


// 当每页条数发生变化时调用此函数
const onSizeChange = (size) => {
  pageSize.value = size;
  getNoticeList();
};

// 当当前页码发生变化时调用此函数
const onCurrentChange = (num) => {
  pageNum.value = num;
  getNoticeList();
};

// 调用接口获取活动列表数据
const getNoticeList = async () => {
  const params = {
    page: "1",
    pageSize: "5",
  };
  try {
    const response = await NoticeList(params);
    notices.value = response.data.rows;
  } catch (error) {
    console.error('Failed to fetch list', error);
  }
};

const onSuccess =(type) =>{

  getNoticeList()
}
getNoticeList();


</script>


<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>公告管理</span>
        <div class="extra">
          <el-button type="primary" @click="onAddNotice">添加公告</el-button>
        </div>
      </div>
    </template>

    <!-- 活动列表 -->
    <el-table :data="notices" style="width: 100%">
      <el-table-column label="公告名称" width="200" prop="title"></el-table-column>
      <el-table-column label="公告日期" width="200" prop="time"></el-table-column>
      <el-table-column label="作者" prop="author"></el-table-column>
      <el-table-column label="内容" prop="content"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button :icon="Edit" @click="onEditNotice(row)" circle plain type="primary"></el-button>
          <el-button :icon="Delete"  @click="onDeleteNotice(row)" circle plain type="danger"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>

    <!-- 分页条 -->
    <el-pagination
        v-model:current-page="pageNum"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="jumper, total, sizes, prev, pager, next"
        background
        :total="total"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
        style="margin-top: 20px; justify-content: flex-end"
    />

  </el-card>

  <notice-edit ref="noticeEditRef" @success="onSuccess">

  </notice-edit>
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
