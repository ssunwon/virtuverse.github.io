<template>
  <div class="content">
    <!-- <ManageMain></ManageMain> -->
    <!-- <BulletinMain></BulletinMain> -->
    <!-- <BlockingMem></BlockingMem> -->
    <!-- <DormantMem></DormantMem> -->
  </div>
</template>
<script>
// import ManageMain from '@/views/main/ManageMain.vue'
// import BulletinMain from '@/views/main/BulletinMain.vue'
// import BlockingMem from '@/views/main/BlockingMem.vue'
// import DormantMem from '@/views/main/Dorma ntMem.vue'
export default {
  name: 'ConTent',
  components: {
    // ManageMain
    // BulletinMain
    // BlockingMem
    // DormantMem
  },
  data () {
    return {
      menu: [
        {
          header: true,
          title: 'Main Navigation',
          href: 'views/main/BulletinMain'
          // component: componentName
          // visibleOnCollapse: true
        },
        {
          href: '/views/main/BulletinMain',
          title: 'Dashboard',
          icon: 'fa fa-user'
          /*
            disabled: true
            badge: {
                text: 'new',
                // class:''
            }
            */
        },
        {
          title: 'Charts',
          icon: 'fa fa-chart-area',
          child: [
            {
              href: '@/views/main/BulletinMain',
              title: 'Sub Link'
            }
          ]
        }
      ]
    }
  },
  props: {
    // menu: {
    //   type: Array,
    //   required: true
    // },
    collapsed: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '250px'
    },
    widthCollapsed: {
      type: String,
      default: '50px'
    },
    showChild: {
      type: Boolean,
      default: false
    },
    theme: { // available themes: 'white-theme'
      type: String,
      default: ''
    },
    showOneChild: {
      type: Boolean,
      default: false
    },
    rtl: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped>
.content{width: calc(100% - 200px); background-color: rgb(243 244 246); display: inline-block; height: inherit; padding: 20px 12px; box-sizing: border-box;}
</style>
