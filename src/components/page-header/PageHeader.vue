<template>
  <el-page-header @back="goBack">
    <template v-slot:content>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :key="item.name" v-for="item of breadList">
          <router-link :to="{ name: item.name }">{{item.title}}</router-link>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </template>
  </el-page-header>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator'
  import { debounce, executeUntil } from '@/util/common/fns/fns'
  import { Route } from 'vue-router'
  import { getPageTitle } from '@/util/project/fns/fns-project'
  import { Pattern } from '@/models/common/models'
  import { getAllParentById } from '@/util/common/fns/fns-tree'

  interface ListItem {
    id: string
    index: string
    title: string
  }

  @Component({})
  export default class PageHeader extends Vue {
    public baseBread = [ { name: 'home', title: '首页' } ]
    public breadList = [ ...this.baseBread ]

    public created () {
    }

    @Watch('$route', { immediate: true })
    public routeChange (crtRoute: Route) {
      const me = this
      debounce(() => {
        // 自动根据路由关系生成面包屑导航只能展示简单的通用的导航信息，如果导航信息过于复杂，则需要通过自定义实现
        let breadMenus: any = []
        executeUntil(() => me.$store.state.menus.length > 0, () => {
          const list: ListItem[] = me.$store.state.menus // [{index: '', title: ''}]
          if (crtRoute.meta && crtRoute.meta.parentName) {
            // 当前路由是不会显示在菜单导航栏中的
            const crtParent: ListItem | undefined = list.find((item: any) => item.index === crtRoute.meta.parentName)
            if (crtParent) {
              // 大部分的菜单都是后端配置的，但是前端的路由还是控制者部分导航信息的显示
              breadMenus = [ ...getBreadList(getAllParentById(list, crtParent.id)), {
                name: crtParent.index,
                title: crtParent.title,
              }, { name: crtRoute.name, title: crtRoute.meta.title } ]
            } else {
              breadMenus = [ { name: crtRoute.name, title: crtRoute.meta.title } ]
            }
            if (!crtRoute.meta.notAutoPageTitle) {
              breadMenus.push({ title: getPageTitle(crtRoute.params.pattern as Pattern) })
            }
          } else {
            const crtMenu: ListItem | undefined = list.find((item: any) => item.index === crtRoute.name)
            if (crtMenu) {
              breadMenus = [ ...getBreadList(getAllParentById(list, crtMenu.id)), {
                name: crtMenu.index,
                title: crtMenu.title,
              } ]
            } else {
              breadMenus = []
            }
          }
          me.breadList = [ ...me.baseBread, ...breadMenus ]
        })
      }, 100)()
    }

    public goBack () {
      this.$router.back()
    }
  }

  function getBreadList (list: any[]) {
    return list.map((item: any) => ({ name: item.index, title: item.title }))
  }
</script>
<style lang="less" scoped>
  .el-page-header .el-breadcrumb {
    line-height: inherit;
  }
</style>
