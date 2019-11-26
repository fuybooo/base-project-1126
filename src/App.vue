<template>
  <el-container class="h" id="app">
    <el-main class="h">
      <app-lang-setting :class="['lang-setting', {dn: !$store.state.showLangSetting}]"
                        id="js-lang-setting"></app-lang-setting>
      <router-view :class="[$route.name]"></router-view>
    </el-main>
  </el-container>
</template>
