<script setup>
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
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
          <el-icon>
            <Management />
          </el-icon>
          <span>仪表盘</span>
        </el-menu-item>
        <el-menu-item index="/ActivityInfo">
          <el-icon>
            <Promotion />
          </el-icon>
          <span>活动中心</span>
        </el-menu-item>
        <el-sub-menu >
          <template #title>
            <el-icon>
              <UserFilled />
            </el-icon>
            <span>个人中心</span>
          </template>
          <el-menu-item index="/User/UserInfo" >
            <el-icon>
              <User />
            </el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/User/FlightInfo" >
            <el-icon>
              <Crop />
            </el-icon>
            <span>飞行记录</span>
          </el-menu-item>
          <el-menu-item index="/User/FeedBack" >
            <el-icon>
              <EditPen />
            </el-icon>
            <span>意见反馈</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/BeforeFlight">
          <el-icon>
            <Promotion />
          </el-icon>
          <span>航前准备</span>
        </el-menu-item>
        <el-sub-menu >
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
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <!-- 右侧主区域 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <div>早上好：<strong>LinusChen</strong></div>
        <el-dropdown placement="bottom-end">
                    <span class="el-dropdown__box">
                        <el-avatar :src="avatar" />
                        <el-icon>
                            <CaretBottom />
                        </el-icon>
                    </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
              <el-dropdown-item command="password" :icon="EditPen">重置密码</el-dropdown-item>
              <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>

      <!-- 中间区域 -->
      <el-main>
        <div style="width: 1400px; height: 700px;border: 1px solid red;">
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