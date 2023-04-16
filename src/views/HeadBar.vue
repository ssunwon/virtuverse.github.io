<template>
  <div class="headbar">
    <div class="headerbar_l"><b>버튜버스-Admin</b></div>
    <div class="headerbar_r">
      <div><p>관리자님 환영합니다.</p></div>
      <div class="header_Btn">
        <button class="all_black">내정보</button>
        <button class="all_black">로그아웃</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: ' HeadBar ',
  setup () {
  }
}
</script>
<style scoped>
.headbar{height: 50px; padding:12px; box-sizing: border-box; width: 100%; line-height: 26px;}
.headbar div{}
.headbar .headerbar_l{float: left;}
.headbar .headerbar_l b{font-weight: bold; line-height: 26px;}
.headbar .headerbar_r{float: right;}
.headbar .headerbar_r div{float: left;}
.headbar .headerbar_r div p{font-size: 14px; line-height: 26px;}
.headbar .headerbar_r .header_Btn button{width: 70px; height: 26px; margin-left:8px;}
</style>
