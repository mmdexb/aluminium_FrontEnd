<script setup>
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Files,
  Crop,
  HomeFilled,
  SwitchButton,
  CaretBottom,
  LocationFilled
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import router from "@/router";
import {GetUserInfo} from '@/api/user'
import {ref} from "vue";

const Logout =() =>{
  localStorage.removeItem("pinia-token");
  router.push('/login')
}

const Info=ref({

})

const isadmin= ref(false)
const username=ref("")

const GetInfo=async () => {
  let res = await GetUserInfo();
  Info.value=res.data;
  console.log(Info.value)
  username.value=Info.value.realname;
  console.log(username.value)
  if(Info.value.level==="ADMINISTRATOR"){
    isadmin.value=true
  }

}
GetInfo();



</script>
//田鑫提交测试
<template>
  <el-container class="layout-container">
    <!-- 左侧菜单 -->
    <el-aside width="200px">
      <div class="el-aside__logo"></div>
      <el-menu
          class="el-menu-vertical-demo"
          active-text-color="#ffd04b"
          router>
        <el-menu-item index="/Dashboard" >
          <el-icon><HomeFilled /></el-icon>
          <span>仪表盘</span>
        </el-menu-item>
        <el-menu-item index="/ActivityInfo">
          <el-icon><Files /></el-icon>
          <span>活动中心</span>
        </el-menu-item>
        <el-menu-item index="/map">
          <el-icon><LocationFilled /></el-icon>
          <span>在线地图</span>
        </el-menu-item>
        <el-menu-item index="/User/UserInfo" >
          <el-icon>
            <User />
          </el-icon>
          <span>基本资料</span>
        </el-menu-item>
        <el-menu-item index="/BeforeFlight">
          <el-icon>
            <Promotion />
          </el-icon>
          <span>航前准备</span>
        </el-menu-item>
        <el-sub-menu  v-if="isadmin">
          <template #title>
            <el-icon>
              <UserFilled />
            </el-icon>
            <span>管理员</span>
          </template>
          <el-menu-item index="/Admin/UserControl" >
            <el-icon>
              <User />
            </el-icon>
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="/Admin/ActivityControl" >
            <el-icon>
              <Crop />
            </el-icon>
            <span>活动管理</span>
          </el-menu-item>
          <el-menu-item index="/Admin/NoticeControl" >
            <el-icon>
              <Crop />
            </el-icon>
            <span>公告管理</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <!-- 右侧主区域 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header height="60px">
        <div>欢迎：<strong>{{ username }}</strong></div>
        <el-dropdown placement="bottom-end">
                    <span class="el-dropdown__box">
                        <el-avatar :src="avatar" />
                        <el-icon>
                            <CaretBottom />
                        </el-icon>
                    </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="logout" :icon="SwitchButton"  @click="Logout" >退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>

      <!-- 中间区域 -->
      <el-main>
        <div style="width: 100%; height: 100%;">
          <router-view></router-view>
        </div>
      </el-main>
      <!-- 底部区域 -->
      <el-footer>Aluminium ©2024 Created by LinusChen </el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;

  .el-aside {
    background-color: #ffffff;

    &__logo {
      height: 120px;
      background: url('@/assets/logo.png') no-repeat center / 120px auto;
    }

    .el-menu {
      border-right: none;
    }
  }

  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-dropdown__box {
      display: flex;
      align-items: center;

      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }

  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>