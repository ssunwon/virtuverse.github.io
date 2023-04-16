<template>
  <div class="menubar">
      <!-- <h2 class="admin">ADMIN</h2> -->
      <ul class="side-m">
        <li @click="BulletinMain">
          <p :class="{active : this.$store.state.currenttab == 'BulletinMain'}">회원목록</p>
        </li>
        <li @click="BlockingMem">
          <p :class="{active : this.$store.state.currenttab == 'BlockingMem'}">차단회원</p>
        </li>
        <li @click="DormantMem">
          <p :class="{active : this.$store.state.currenttab == 'DormantMem'}">휴면회원</p>
        </li>
      </ul>
  </div>
</template>

<script>

export default {
  name: 'MenuBar',
  methods: {
    ManageMain () {
      this.$router.push({ name: 'ManageMain' }).catch(() => {})
      return false
    },
    BulletinMain () {
      this.$router.push({ name: 'BulletinMain' }).catch(() => {})
      return false
    },
    BlockingMem () {
      this.$router.push({ name: 'BlockingMem' }).catch(() => {})
      return false
    },
    DormantMem () {
      this.$router.push({ name: 'DormantMem' }).catch(() => {})
      return false
    }
  }
}
</script>
<style scoped>
.menubar{width:200px; display: inline-block; background-color: rgb(30 41 59); height: calc(100vh - 50px); float: left;}
.tabs{float: left; ;background-color: #fff; width: 100%; border-right: 1px solid #ccc; display: inline-block; position: relative;}
h3{text-align: center; color:#fff; position: absolute; top: 50%; width:100%; font-size:12px; font-weight:400;}
/* .admin{height: 52px; line-height:52px; text-align:center; font-weight: bold; font-size: 20px; color:#fff; border-bottom:1px solid #4d4d4d;  background-color: #1a1a1a;} */
.manager{padding: 15px 20px; border-bottom:1.5px solid #ededed;}
.manager p{font-size: 16px; text-align: left; }
/* .side-m{position: relative;} */
.side-m li p{height:inherit; line-height: 48px; border: 1px solid #ccc; color: #ccc; font-weight: bold; font-size:14px; cursor: pointer; border-right: 0; border-left: 0;}
.side-m li:last-child p{border-top: 0px;}
.side-m li p.active{background: #ccc; color:#fff; cursor: pointer; font-weight: 700;}
.option_tab{overflow: hidden; display: block;}
.option_tab li{height: 40px; font-size: 14px;line-height: 40px; font-weight: normal; overflow: hidden; display: block;border-bottom: 1px solid #F2F2F2; cursor: pointer;}
.option_tab li:last-child{border-bottom: 0px;}
.option_tab li.li_act{color: #ccc; font-weight: bold;}
</style>
