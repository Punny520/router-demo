<template>
    <el-menu
      mode="horizontal"
      :ellipsis="false"
    >
      <el-menu-item index="0">
        <el-text class="mx-1" size="large">天天向上</el-text>
      </el-menu-item>

      <div class="flex-grow" />

      <el-menu-item index="1"><el-icon><UserFilled /></el-icon>个人信息</el-menu-item>

      <el-sub-menu index="2">
        <template #title><el-icon><School /></el-icon>学习</template>
        <el-menu-item index="2-1"><el-icon><CircleCheck /></el-icon>答题</el-menu-item>
        <el-menu-item index="2-2"><el-icon><Document /></el-icon>学习资料</el-menu-item>
      </el-sub-menu>

      <el-menu-item index="3"><el-icon><TrophyBase /></el-icon>积分排行榜</el-menu-item>

      <el-menu-item index="4"><el-icon><Goods /></el-icon>积分商城</el-menu-item>

      <el-menu-item index="5"><el-icon><User /></el-icon>登录/注册</el-menu-item>

    </el-menu>
  </template>
  
  <script>
  </script>
  
  <style>
  .flex-grow {
    flex-grow: 1;
  }
  </style>
  