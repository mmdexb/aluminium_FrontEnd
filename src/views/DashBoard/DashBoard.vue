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
                      <div class="text-dark fw-bold h5 mb-0"><span>fxysl</span></div>
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
                      <div class="text-dark fw-bold h5 mb-0"><span>gzysl</span></div>
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
                          <div class="text-dark fw-bold h5 mb-0 me-3"><span>fwsc</span></div>
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
                      <div class="text-dark fw-bold h5 mb-0"><span>hdsl</span></div>
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
                  <div ref="chart" style="width:100%; height:350px;"></div>
                </div>
              </div>
            </div>
            <div class="col-lg-5 col-xl-4">
              <div class="card shadow mb-4">
                <div class="card-header d-flex justify-content-between align-items-center">
                  <h6 class="text-primary fw-bold m-0">热门机场</h6>
                </div>
                <div class="card-body">
                  <div ref="wordCloudChart" style="width: 100%; height: 318px;"></div>
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
                  <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-lg-6 mb-4">
              <div class="card shadow mb-4">
                <div class="card-header py-3">
                  <h6 class="text-primary fw-bold m-0">平台公告</h6>
                </div>
                <div class="card-body">
                  <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import { CanvasRenderer } from 'echarts/renderers';
import 'echarts-wordcloud'
import { TitleComponent, TooltipComponent } from 'echarts/components';
import '@fortawesome/fontawesome-free/css/all.min.css';


echarts.use([CanvasRenderer,  TitleComponent, TooltipComponent]);
export default {
  name: 'BarChart',
  setup() {
    const chart = ref(null);
    const wordCloudChart = ref(null);

    // 模拟后端数据
    const fetchDataFromBackend = () => {
      return new Promise((resolve) => {
        // 模拟异步请求延迟
        setTimeout(() => {
          // 假设从后端获取的数据是一个包含 x 轴标签和对应的数据值的数组
          const dataFromBackend = [
            { name: 'A', value: 100 },
            { name: 'B', value: 200 },
            { name: 'C', value: 300 },
            { name: 'D', value: 400 },
            { name: 'E', value: 500 },
            { name: 'F', value: 500 },
            { name: 'G', value: 500 },
          ];
          resolve(dataFromBackend);
        }, 1000); // 模拟延迟 1 秒
      });
    };
    const fetchDataForWordCloud = () => {
      return new Promise((resolve) => {
        // 模拟异步请求延迟
        setTimeout(() => {
          // 假设从后端获取的词云数据是一个包含词语和对应权重的数组
          const wordCloudData = [
            { name: '词语1', value: 1 },
            { name: '词语2', value: 4 },
            { name: '词语3', value: 3 },
            // 其他词云数据...
          ];
          resolve(wordCloudData);
        }, 1); // 模拟延迟 1 秒
      });
    };


    // 绘制柱状图
    const drawBarChart = async () => {
      const chartInstance = echarts.init(chart.value);

      // 获取后端数据
      const data = await fetchDataFromBackend();

      // 提取 x 轴标签和对应的数据值
      const xData = data.map(item => item.name);
      const yData = data.map(item => item.value);

      // 配置图表选项
      const options = {
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
      const chartInstance = echarts.init(wordCloudChart.value);

      // 获取后端数据
      const wordCloudData = await fetchDataForWordCloud();

      // 提取词语和对应权重
      const wordCloudOptions = {
        series: [{
          type: 'wordCloud',
          data: wordCloudData.map(item => ({
            name: item.name,
            value: item.value,
          })),
        }],
      };

      // 使用配置项绘制词云图
      chartInstance.setOption(wordCloudOptions);
    };

    // 在组件挂载后绘制图表
    onMounted(() => {
      drawBarChart();
      drawWordCloud();
    });

    return {
      chart,
      wordCloudChart,
    };
  },
};

</script>

<style>
/* 可以根据需要添加样式 */
</style>


<style scoped>

</style>
