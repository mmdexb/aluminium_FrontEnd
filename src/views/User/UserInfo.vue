<script setup>
import { ref, onMounted ,watch} from 'vue';
import {GetUserInfo,GetFlightByid} from '@/api/user';


const UserInfo =ref([]);
const Flights=ref([

])
const getInfo =async ()=>{
  let res=await GetUserInfo();
  UserInfo.value=res.data;
  let params={
    cid: UserInfo.value.cid
  }
  let res2=await GetFlightByid(params);
  Flights.value=res2.data;

}
getInfo()









</script>


<template>
    <div class="d-flex flex-column" id="content-wrapper">
      <div id="content">
        <div class="container-fluid">
          <h3 class="text-dark mb-4">我的信息</h3>
          <div class="row mb-3">
            <div class="col-lg-4">
              <div class="card mb-3">
                <div class="card-body text-center shadow"><img class="rounded-circle mb-3 mt-4" src="@/assets/default.png" width="160" height="160">
                  <div class="mb-3"></div><span>{{ UserInfo.cid }}</span>
                </div>
              </div>
              <div class="card shadow mb-4">
                <div class="card-header py-3">
                  <h6 class="text-primary fw-bold m-0">生涯数据</h6>
                </div>
                <div class="card-body">
                  <form>
                    <div class="mb-3"><label class="form-label" for="first_name"><strong>最爱的机场</strong></label><input class="form-control" type="text" id="first_name-1" :placeholder=UserInfo.loveAirport disabled="true" name="first_name"></div>
                    <div class="mb-3"><label class="form-label" for="first_name"><strong>最爱的机型</strong></label><input class="form-control" type="text" id="first_name-2" :placeholder=UserInfo.loveType disabled="true" name="first_name"></div>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-lg-8">
              <div class="row mb-3 d-none">
                <div class="col">
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="card shadow mb-3">
                    <div class="card-header py-3">
                      <p class="text-primary m-0 fw-bold">个人信息</p>
                    </div>
                    <div class="card-body">
                      <form>
                        <div class="row">
                          <div class="col">
                            <div class="mb-3"><label class="form-label" for="username"><strong>真实姓名</strong></label><input class="form-control" disabled="true" type="text" id="username" :placeholder=UserInfo.realname name="username"></div>
                          </div>
                          <div class="col">
                            <div class="mb-3"><label class="form-label" for="email"><strong>电子邮箱</strong></label><input class="form-control" type="email" id="email" disabled="true" :placeholder=UserInfo.email name="email"></div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                            <div class="mb-3"><label class="form-label" for="first_name"><strong>等级</strong></label><input class="form-control" type="text" id="first_name" disabled="true" :placeholder=UserInfo.level name="first_name"></div>
                          </div>
                          <div class="col">
                            <div class="mb-3"><label class="form-label" for="last_name"><strong>飞行时长</strong></label><input class="form-control" type="text" id="last_name" :placeholder=UserInfo.time disabled="true" name="last_name"></div>
                          </div>
                        </div>
                        <div class="mb-3"></div>
                      </form>
                    </div>
                  </div>
                  <div class="card shadow">
                    <div class="card-header py-3">
                      <p class="text-primary m-0 fw-bold">近期飞行</p>
                    </div>
                    <div class="card-body">
                      <el-table :data="Flights" stripe style="width: 100%">
                        <el-table-column prop="callsign" label="呼号" width="100" />
                        <el-table-column prop="dep" label="起飞机场" width="100" />
                        <el-table-column prop="arr" label="到达机场" width="100" />
                        <el-table-column prop="type" label="机型" width="100" />
                        <el-table-column prop="startTime" label="登录时间" width="180" />
                        <el-table-column prop="route" label="航路" />
                      </el-table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>


<style>

</style>

