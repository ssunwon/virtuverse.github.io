<template>
  <div class="menubar" v-show="this.$store.state.currentpage != 'popup' && this.$store.state.currentpage != 'receiptmain'
                                && this.$store.state.currentpage != 'info'">
    <div class="tabs" v-show="this.$store.state.currentpage != 'popup' && this.$store.state.currentpage != 'receiptmain'
                                && this.$store.state.currentpage != 'info'" >
      <!-- <h2 class="admin">ADMIN</h2> -->
      <ul class="side-m" v-show="this.$store.state.currentpage == 'drivermain'">
        <li @click="drivemain">
          <p :class="{active : this.$store.state.currenttab == 'drivermain'}">기사 관리</p>
        </li>
        <li @click="insurelicense">
          <p :class="{active : this.$store.state.currenttab == 'insurelicense'}">보험 / 면허</p>
        </li>
        <li @click="allocation">
          <p :class="{active : this.$store.state.currenttab == 'allocation'}">공유콜 배차제한</p>
        </li>
        <li @click="serveice_money">
          <p :class="{active : this.$store.state.currenttab == 'serveice_money'}">서비스이용료</p>
        </li>
      </ul>
      <ul class="side-m reserves" v-show="this.$store.state.currentpage == 'reserves'">
        <li @click="daw_driver">
          <p :class="{active : this.$store.state.currenttab == 'daw_driver'}">기사별 입출금관리</p>
        </li>
        <li @click="daw_agency">
          <p :class="{active : this.$store.state.currenttab == 'daw_agency'}">회원사 입출금내역</p>
        </li>
        <li @click="reserve_manage">
          <p :class="{active : this.$store.state.currenttab == 'reserve_manage'}">회원사별 정산금 관리</p>
        </li>
      </ul>
      <ul class="side-m" v-show="this.$store.state.currentpage == 'clientmain'">
        <li @click="clientmain">
          <p :class="{active : this.$store.state.currenttab == 'client_ref'}">고객 조회</p>
        </li>
        <li @click="corporation">
          <p :class="{active : this.$store.state.currenttab == 'corporation'}">법인 조회</p>
        </li>
        <li @click="corporation_management">
          <p :class="{active : this.$store.state.currenttab == 'corporation_management'}">법인 관리</p>
        </li>
        <li @click="corporation_use">
          <p :class="{active : this.$store.state.currenttab == 'corporation_use'}">법인사용내역</p>
        </li>
      </ul>
      <ul class="side-m" v-show="this.$store.state.currentpage == 'statics'">
        <li @click="date_call">
          <p :class="{active : this.$store.state.currenttab == 'date_call'}">기간별 콜 통계</p>
        </li>
        <li @click="member_call">
          <p :class="{active : this.$store.state.currenttab == 'member_call'}">회원사별 콜 통계</p>
        </li>
        <li @click="time_call">
          <p :class="{active : this.$store.state.currenttab == 'time_call'}">시간별 콜 분포</p>
        </li>
        <li @click="timezone">
          <p :class="{active : this.$store.state.currenttab == 'timezone'}">시간대 별 통계</p>
        </li>
        <li @click="local">
          <p :class="{active : this.$store.state.currenttab == 'local'}">지역 통계</p>
        </li>
        <li @click="cancel">
          <p :class="{active : this.$store.state.currenttab == 'cancel'}">취소사유별 통계</p>
        </li>
      </ul>
      <ul class="side-m" v-show="this.$store.state.currentpage == 'staff'">
        <li :class="{active : this.$store.state.currenttab == 'staff_management'}" @click="staff">직원 관리</li>
      </ul>
      <ul class="side-m" v-show="this.$store.state.currentpage == 'setting'">
        <li>
          <p :class="{'active' : this.$store.state.currenttab == 'setting'}" @click="setting">옵션설정</p>
          <ul :class="{'option_tab' : this.$store.state.currenttab == 'setting'}" v-show="this.$store.state.currenttab == 'setting'">
            <li :class="{'li_act' : scrolltop >= 0 && scrolltop < 853}" @click="scrollinfo = 'nor'">일반</li>
            <li :class="{'li_act' : scrolltop >= 853 && scrolltop < 988}" @click="scrollinfo = 'cost'">요금</li>
            <li :class="{'li_act' : scrolltop >= 988 && scrolltop < 1398}" @click="scrollinfo = 'mileage'">마일리지</li>
            <li :class="{'li_act' : scrolltop >= 1398 && scrolltop < 1780}" @click="scrollinfo = 'sms'">SMS</li>
            <li :class="{'li_act' : scrolltop >= 1780 && scrolltop < 2256}" @click="scrollinfo = 'device'">단말기</li>
            <li :class="{'li_act' : scrolltop >= 2256}" @click="scrollinfo = 'card'">카드결제</li>
          </ul>
        </li>
        <li><p :class="{'active' : this.$store.state.currenttab == 'receipt_setting'}" @click="receipt_setting">영수증 설정</p></li>
        <li><p :class="{'active' : this.$store.state.currenttab == 'member_manage'}" @click="member_manage">회원사 관리</p></li>
      </ul>
      <div class="left_btn"></div>
    </div>
  </div>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  name:'menubar',

  data() {
    return {

    };
  },
  watch : {
  },
  computed : {
    ...mapGetters(["getscrolltop"]),
    ...mapGetters(["getsettingcontent"]),

    scrolltop : {
      get(){
        return this.getscrolltop
      },
      set(newval){
        this.$store.commit('setscrolltop', newval)
      }
    },
    scrollinfo : {
      get(){
        return this.getsettingcontent
      },
      set(newval){
        this.$store.commit('setsettingcontent', newval)
      }
    },

  },
  methods: {
    drivemain(){
      this.$router.push({ name: 'drivermain' }).catch(()=>{});
      return false
    },
    insurelicense(){
      this.$router.push({ name: 'insurelicense' }).catch(()=>{});
      return false
    },
    allocation(){
      this.$router.push({ name: 'allocation' }).catch(()=>{});
      return false
    },
    serveice_money(){
      this.$router.push({ name: 'serveice_money' }).catch(()=>{});
      return false
    },





    daw_driver(){
      this.$router.push({ name: 'daw_driver' }).catch(()=>{});
      return false
    },
    daw_agency(){
      this.$router.push({ name: 'daw_agency' }).catch(()=>{});
      return false
    },
    reserve_manage(){
      this.$router.push({ name: 'reserve_manage' }).catch(()=>{});
      return false
    },



    clientmain(){
      this.$router.push({ name: 'clientmain' }).catch(()=>{});
      return false
    },
    corporation(){
      this.$router.push({ name: 'corporation' }).catch(()=>{});
      return false
    },
    corporation_management(){
      this.$router.push({ name: 'corporation_management' }).catch(()=>{});
      return false
    },
    corporation_use(){
      this.$router.push({ name: 'corporation_use' }).catch(()=>{});
      return false
    },


    staff(){
      this.$router.push({ name: 'staff_management' }).catch(()=>{});
      return false
    },


    date_call(){
      this.$router.push({ name: 'date_call' }).catch(()=>{});
      return false
    },
    member_call(){
      this.$router.push({ name: 'member_call' }).catch(()=>{});
      return false
    },
    time_call(){
      this.$router.push({ name: 'time_call' }).catch(()=>{});
      return false
    },

    timezone(){
      this.$router.push({ name: 'timezone' }).catch(()=>{});
      return false
    },
    local(){
      this.$router.push({ name: 'local' }).catch(()=>{});
      return false
    },
    cancel(){
      this.$router.push({ name: 'cancel' }).catch(()=>{});
      return false
    },

    setting(){
      this.$router.push({ name: 'setting' }).catch(()=>{});
      return false
    },
    receipt_setting(){
      this.$router.push({ name: 'receipt_setting' }).catch(()=>{});
      return false
    },
    member_manage(){
      this.$router.push({ name: 'member_manage' }).catch(()=>{});
      return false
    }
  }
}

</script>
<style scoped>
.menubar{width: 169px; float: left; background-color: #fff; box-sizing: border-box;}
.menubar{width:200px; display: inline-block; background-color: rgb(30 41 59); height: calc(100vh - 50px); float: left;}
.tabs{float: left; ;background-color: #fff; width: 100%; border-right: 1px solid #ccc; display: inline-block; position: relative;}
h3{text-align: center; color:#fff; position: absolute; top: 50%; width:100%; font-size:12px; font-weight:400;}
/* .admin{height: 52px; line-height:52px; text-align:center; font-weight: bold; font-size: 20px; color:#fff; border-bottom:1px solid #4d4d4d;  background-color: #1a1a1a;} */
.manager{padding: 15px 20px; border-bottom:1.5px solid #ededed;}
.manager p{font-size: 16px; text-align: left; }
/* .side-m{position: relative;} */
.side-m li p{height:inherit; line-height: 48px; border: 1px solid #326CFF; color: #326CFF; font-weight: bold; font-size:14px; cursor: pointer; border-right: 0; border-left: 0;}
.side-m li:last-child p{border-top: 0px;}
.side-m li p.active{background: #326CFF; color:#fff; cursor: pointer; font-weight: 700;}
.left_btn{position: absolute; display: none; right:-12px; top: 65px; width: 24px; height: 24px;background: #FFFFFF url(@/assets/images/left_menu.png) no-repeat center; background-size:  15.75px 11.25px; border-radius: 3px;  filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.25)); cursor:pointer; z-index: 200;}
.left_btn:hover{background: #FFFFFF url(@/assets/images/left_menu_all.png) no-repeat center; background-size:  15.75px 11.25px;}
.option_tab{overflow: hidden; display: block;}
.option_tab li{height: 40px; font-size: 14px;line-height: 40px; font-weight: normal; overflow: hidden; display: block;border-bottom: 1px solid #F2F2F2; cursor: pointer;}
.option_tab li:last-child{border-bottom: 0px;}
.option_tab li.li_act{color: #326CFF; font-weight: bold;}
</style>
