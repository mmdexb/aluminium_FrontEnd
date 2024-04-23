<script setup>
import { ref, defineExpose } from "vue";
import { userPublish, userDetail, updateuserLevel } from "@/api/UserControl";
import { ElMessage } from "element-plus";

const visibleDraw = ref(false);

//默认数据
const defaultuserForm = {
  cid: "", //cid
  realname: "", //真实姓名
  pwd: "", //密码
  level: "", //等级
  email: "", //电子邮箱
};

const options = ref([
  { value: 'SUSPENDED', label: 'SUSPENDED' },
  { value: 'OBSPILOT', label: 'OBSPILOT' },
  { value: 'STUDENT1', label: 'STUDENT1' },
  { value: 'STUDENT2', label: 'STUDENT2' },
  { value: 'STUDENT3', label: 'STUDENT3' },
  { value: 'CONTROLLER1', label: 'CONTROLLER1' },
  { value: 'CONTROLLER2', label: 'CONTROLLER2' },
  { value: 'CONTROLLER3', label: 'CONTROLLER3' },
  { value: 'INSTRUCTOR1', label: 'INSTRUCTOR1' },
  { value: 'INSTRUCTOR2', label: 'INSTRUCTOR2' },
  { value: 'INSTRUCTOR3', label: 'INSTRUCTOR3' },
  { value: 'SUPERVISOR', label: 'SUPERVISOR' },
  { value: 'ADMINISTRATOR', label: 'ADMINISTRATOR' },
])

//数据
let formuserModel = ref({ ...defaultuserForm });

const emit = defineEmits(["success"]);
const onuserPublish = async () => {
  if (formuserModel.cid){
    //编辑
    const user = {
      cid: formuserModel.value.cid,
      level: formuserModel.value.level
    };
    await updateuserLevel(user);
    visibleDraw.value = false;
    emit("success", "edit");
  } else {
    //添加
    await userPublish(formuserModel.value);
    visibleDraw.value = false;
    emit("success", "add");
  }
};

const openuser = async (rows) => {
  visibleDraw.value = true;
  if (rows.cid) {
    //这里编辑 基于row.cid 发送请求
    const Ress = await userDetail(rows.cid);
    Ress.data && (formuserModel.value = Ress.data);
    formuserModel.value.pwd = Ress.data.password;
  } else {
    formuserModel.value = {...defaultuserForm};
  }
};

defineExpose({
  openuser,
});
</script>

<template>
  <el-drawer
      v-model="visibleDraw"
      :title="formuserModel.cid ? '编辑成员等级' : '添加临时成员'"
      size="40%"
  >
    <el-form :model="formuserModel" ref="formRef" label-width="100px">
      <el-form-item
          label="用户cid"
          prop="cid"
          style="margin-left: 10px; margin-right: 10px"
      >
        <el-input
            v-model="formuserModel.cid"
            placeholder="请输入cid"
        ></el-input>
      </el-form-item>
      <el-form-item
          label="用户密码"
          prop="pwd"
          style="margin-left: 10px; margin-right: 10px"
      >
        <el-input
            v-model="formuserModel.pwd"
            placeholder="请输入用户密码"
        ></el-input>
      </el-form-item>
      <el-form-item
          label="用户等级"
          prop="level"
          style="margin-left: 10px; margin-right: 10px"
      >
        <el-select-v2
            v-model="formuserModel.level"
            :options="options"
            placeholder="Please select"
            style="width: 240px"
        />
      </el-form-item>
      <el-form-item
      >
        <el-button
            @click="onuserPublish"
            type="primary"
            style="margin-left: 110px; margin-right: 10px"
        >完成
        </el-button
        >
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style scoped lang="scss">
</style>
