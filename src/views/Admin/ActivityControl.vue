<script setup>
import {
  Edit,
  Delete
} from '@element-plus/icons-vue'
import { ref } from 'vue';
import { ActivityList } from '@/api/ActivityControl';

// 活动列表数据模型
const activities = ref([]);
// 分页条数据模型
const pageNum = ref(1); // 当前页
const total = ref(20); // 总条数
const pageSize = ref(10); // 每页条数

// 当每页条数发生变化时调用此函数
const onSizeChange = (size) => {
  pageSize.value = size;
  getActivityList();
};

// 当当前页码发生变化时调用此函数
const onCurrentChange = (num) => {
  pageNum.value = num;
  getActivityList();
};

// 调用接口获取活动列表数据
const getActivityList = async () => {
  const params = {
    page: "1",
    pageSize: "5",
  };

  try {
    const response = await ActivityList(params);
    activities.value = response.data.rows;
  } catch (error) {
    console.error('Failed to fetch activity list', error);
  }
};
getActivityList();
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>活动管理</span>
        <div class="extra">
          <el-button type="primary">添加活动</el-button>
        </div>
      </div>
    </template>
    <!-- 活动列表 -->
    <el-table :data="activities" style="width: 100%">
      <el-table-column label="活动名称" width="200" prop="eventname"></el-table-column>
      <el-table-column label="活动日期" width="200" prop="eventtime"></el-table-column>
      <el-table-column label="起飞机场" prop="dep"></el-table-column>
      <el-table-column label="到达机场" prop="arr"></el-table-column>
      <el-table-column label="航路" prop="eventroute"></el-table-column>
      <el-table-column label="附加信息" prop="eventinfo"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button :icon="Edit" circle plain type="primary"></el-button>
          <el-button :icon="Delete" circle plain type="danger"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <!-- 分页条 -->
    <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[10, 20 ,30, 40]"
                   layout="jumper, total, sizes, prev, pager, next" background :total="total"
                   @size-change="onSizeChange" @current-change="onCurrentChange"
                   style="margin-top: 20px; justify-content: flex-end" />
  </el-card>
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
