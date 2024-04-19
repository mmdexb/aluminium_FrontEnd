<script setup  >
import { ref, onMounted ,watch} from 'vue';
import * as echarts from 'echarts';
import { CanvasRenderer } from 'echarts/renderers';
import 'echarts-wordcloud'
import { TitleComponent, TooltipComponent } from 'echarts/components';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {GetUserNum, GetHotAirport, GetATCnum, GetOnlineTimeUsers,GetActivitys,GetNotices} from "@/api/DashBoard"



echarts.use([CanvasRenderer,  TitleComponent, TooltipComponent]);

const PilotNum =ref(null);
const AtcNum =ref(null);
const ActNum =ref(null);
const ServerTime =ref(null);

const Activity=ref([

]);

const drawer = ref(false)

const OnlineTimeUsers=ref([

]);

const Notices=ref([

]);

const Hotairports=ref([

]);

const getInfo =async ()=>{
  let res=await GetUserNum();

  PilotNum.value=res.data;
  res=await GetATCnum();
  AtcNum.value=res.data;
  ActNum.value="6";
  ServerTime.value=Math.ceil((new Date()-new Date('2024-04-10T12:00:00') ) / (1000 * 60 * 60));
}
getInfo()

const getData =async ()=>{
  let res=await GetOnlineTimeUsers();
  OnlineTimeUsers.value=res.data;
  console.log(OnlineTimeUsers.value)
  console.log("数据获取的执行了")
}

const GetHot=async ()=>{
  let res=await GetHotAirport();
  Hotairports.value=res.data;
  console.log(Hotairports.value)
  console.log("词云数据的获取执行了")
}

const GetActivity=async ()=>{
  let params={
    page: "1",
    pageSize: "3",
  }
  let res=await GetActivitys(params);
  console.log(res.data)
  Activity.value=res.data.rows;
}
GetActivity();

const getNoticelist=async ()=>{
  let params={
    page: "1",
    pageSize: "3",
  }
  let res=await GetNotices(params);
  Notices.value=res.data.rows;
}
getNoticelist();

// 绘制柱状图
const drawBarChart = async () => {
  await getData();

  // 获取后端数据
  const data=OnlineTimeUsers.value;
  console.log("绘制执行了")
  // console.log(OnlineTimeUsers)
  // 提取 x 轴标签和对应的数据值
  const xData = data.map(item => item.cid);
  const yData = data.map(item => item.onlineTime);
  const chartInstance = echarts.init(document.getElementById('chart'));

  // 配置图表选项
  const options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xData,
    },
    yAxis: {
      type: 'value',
    },
    series: [{
      data: yData,
      type: 'bar',
    }]
  };

  // 使用配置项绘制图表
  chartInstance.setOption(options);

};
// 绘制词云图
const drawWordCloud = async () => {
  await GetHot();

  // 获取后端数据
  const wordCloudData = Hotairports.value;

  // 提取词语和对应权重
  const wordCloudOptions = {
    series: [{
      type: 'wordCloud',
      data: wordCloudData.map(item => ({
        name: item.Dep,
        value: item.Count,
      })),
      rotationRange: [0, 45],
      rotationStep: 25,
      sizeRange: [30, 50],// 最大旋转幅度不超过45度
    }],
  };

  // 使用配置项绘制词云图
  const chartInstance = echarts.init(document.getElementById('wordCloudChart'));
  chartInstance.setOption(wordCloudOptions);
};



onMounted(() => {
  drawBarChart();
  drawWordCloud();
});


const ShowNotice=()=>{

}
</script>



<template>
  <div id="wrapper">
    <div class="d-flex flex-column" id="content-wrapper">
      <div id="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-7 col-xl-3 mb-4">
              <div class="card shadow border-start-primary py-2">
                <div class="card-body">
                  <div class="row align-items-center no-gutters">
                    <div class="col me-2">
                      <div class="text-uppercase text-primary fw-bold text-xs mb-1"><span>飞行员数量</span></div>
                      <div class="text-dark fw-bold h5 mb-0"><span>{{PilotNum}}人</span></div>
                    </div>
                    <div class="col-auto"><i class="fas fa-user fa-2x text-gray-300"></i></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-xl-3 mb-4">
              <div class="card shadow border-start-success py-2">
                <div class="card-body">
                  <div class="row align-items-center no-gutters">
                    <div class="col me-2">
                      <div class="text-uppercase text-success fw-bold text-xs mb-1"><span>管制员数量</span></div>
                      <div class="text-dark fw-bold h5 mb-0"><span>{{ AtcNum }}人</span></div>
                    </div>
                    <div class="col-auto"><i class="fas fa-briefcase fa-2x text-gray-300"></i></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-xl-3 mb-4">
              <div class="card shadow border-start-info py-2">
                <div class="card-body">
                  <div class="row align-items-center no-gutters">
                    <div class="col me-2">
                      <div class="text-uppercase text-info fw-bold text-xs mb-1"><span>服务时长</span></div>
                      <div class="row g-0 align-items-center">
                        <div class="col-auto">
                          <div class="text-dark fw-bold h5 mb-0 me-3"><span>{{ ServerTime }}h</span></div>
                        </div>
                      </div>
                    </div>
                    <div class="col-auto"><i class="fas fa-clock fa-2x text-gray-300"></i></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-xl-3 mb-4">
              <div class="card shadow border-start-warning py-2">
                <div class="card-body">
                  <div class="row align-items-center no-gutters">
                    <div class="col me-2">
                      <div class="text-uppercase text-warning fw-bold text-xs mb-1"><span>活动数量</span></div>
                      <div class="text-dark fw-bold h5 mb-0"><span>{{ ActNum }}个</span></div>
                    </div>
                    <div class="col-auto"><i class="fas fa-comments fa-2x text-gray-300"></i></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-7 col-xl-8">
              <div class="card shadow mb-4">
                <div class="card-header d-flex justify-content-between align-items-center">
                  <h6 class="text-primary fw-bold m-0">用户在线时长排名</h6>
                </div>
                <div class="card-body py-sm-0">
                  <div  id="chart" style="width:100%; height:350px;"></div>
                </div>
              </div>
            </div>
            <div class="col-lg-5 col-xl-4">
              <div class="card shadow mb-4">
                <div class="card-header d-flex justify-content-between align-items-center">
                  <h6 class="text-primary fw-bold m-0">热门机场</h6>
                </div>
                <div class="card-body">
                  <div id="wordCloudChart" style="width: 100%; height: 318px;"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6 mb-4">
              <div class="card shadow mb-4">
                <div class="card-header py-3">
                  <h6 class="text-primary fw-bold m-0">近期活动</h6>
                </div>
                <div class="card-body">
                  <el-table :data="Activity" stripe style="width: 100%">
                    <el-table-column prop="eventtime" label="日期" width="180" />
                    <el-table-column prop="eventname" label="名称" width="180" />
                    <el-table-column prop="dep" label="出发机场" />
                    <el-table-column prop="arr" label="到达机场" />
                  </el-table>
                </div>
              </div>
            </div>
            <div class="col-lg-6 mb-4">
              <div class="card shadow mb-4">
                <div class="card-header py-3">
                  <h6 class="text-primary fw-bold m-0">平台公告</h6>
                </div>
                <div class="card-body">
                  <el-table :data="Notices" stripe style="width: 100%">
                    <el-table-column prop="title" label="标题" width="180" />
                    <el-table-column prop="time" label="发布日期" width="180" />
                    <el-table-column prop="author" label="作者" />
                    <el-table-column label="操作" width="120">
                      <template #default="{ rows }">
                        <el-button link type="primary" size="small" @click="drawer = true">
                          详情
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <el-drawer v-model="drawer" title="I am the title" :with-header="false">
    <span>

    </span>
  </el-drawer>
</template>
<style scoped>

</style>
