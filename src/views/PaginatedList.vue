<template>
  <div class="content">
    <div class="notice">
      <div class="title">
        <h2>공지사항<p>공지사항 서브타이틀 영역 입니다.</p></h2>
        <button @click="registerNotice">등록</button>
      </div>
      <div class="search">
        <div class="left">
          <div class="select">
            <button class="all" :class="{active : typeActivate}" @click="clickType"><p>{{viewtype(type)}}<img src="@/assets/images/down_arrorw .png" alt="down_arrorw"></p></button>
            <ul class="option_box" v-if="typeActivate">
              <li @click="selecttype(item)" v-for="item in typeList">{{item.title}}</li>
            </ul>
          </div>
          <div class="search_input"><input type="text" placeholder="" maxlength="10" v-model="kword"></div>
          <button class="search_reset" :class="{'serarh_none' : (kword == null || kword == '')}" @click="reset1">초기화</button>
          <button class="seach_txt" @click="getBoardList(1)">검색</button>
        </div>
        <div class="right">
          <!-- <div class="calander">
            <p>작성일</p>
            <date-picker v-model="startdate" valueType="format" :lang="lang"></date-picker>
            ~
            <date-picker v-model="enddate" valueType="format" :lang="lang"></date-picker>
          </div> -->
          <div class="calander">
              <div><DatePicker :lang="lang" v-model="startdate" valueType="format"></DatePicker></div>
            <div class="calander_icon">
              <img src="@/assets/images/calander.png" alt="calander" class="calander_img" @click="visibledate = !visibledate">
              <ul class="limited_period_con date_list_con" v-show="visibledate">
                <li @click="settingdate = 0; visibledate = false;">사용자지정</li>
                <li v-for="item in datelist" @click="settingdate = item.idx; visibledate = false;">{{item.date}}</li>
              </ul>
            </div>
              <div><DatePicker :lang="lang" v-model="enddate" valueType="format"></DatePicker></div>
          </div>
          <button class="date_back" :class="{'date_back_reset' : (startdate != null && startdate != '') || (enddate != null && enddate != '')}" @click="reset2">초기화</button>
        </div>
      </div>
      <div class="board">
        <table class="table_all">
          <thead class="table">
          <tr class="row bold">
            <td class="tabel_number">번호</td>
            <td class="tabel_title">제목</td>
            <td class="tabel_name">작성자</td>
            <td class="tabel_date">작성일</td>
            <td class="tabel_view">조회수</td>
          </tr>
          <tr class="row import" v-for="item in topList">
            <td class="tabel_number">고정</td>
            <td class="tabel_title"><a @click="NoticeDetail(item)">{{item.TITLE}}</a></td>
            <td class="tabel_name">{{item.MEMBER_ID}}</td>
            <td class="tabel_date">{{getNewDate(item.INSERT_DT)}}</td>
            <td class="tabel_view">{{item.HIT}}</td>
          </tr>

          <tr class="row" v-for="item in list">
            <td class="tabel_number">{{item.BBS_NUM}}</td>
            <td class="tabel_title"><a @click="NoticeDetail(item)">{{item.TITLE}}</a></td>
            <td class="tabel_name">{{item.MEMBER_ID}}</td>
            <td class="tabel_date">{{getNewDate(item.INSERT_DT)}}</td>
            <td class="tabel_view">{{item.HIT}}</td>
          </tr>

          </thead>
        </table>
      </div>

      <pager :pass="pager"></pager>
    </div>
  </div>
</template>
<script>
import * as listAPI from '@/api/list'
import Vue from 'vue'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/scss/index.scss';
import Pager from "../../components/common/pager.vue";

Vue.component("pager", Pager);

export default {
  name:'PaginatedList',
  components: { DatePicker },
  data(){
    return{
      visibledate : false,
      datelist: [
        {idx : 1, date : "오늘"},
        {idx : 2, date : "어제~오늘"},
        {idx : 3, date : "최근 5일"},
        {idx : 4, date : "최근 1주일"},
        {idx : 5, date : "최근 2주일"},
        {idx : 6, date : "최근 1개월"},
        {idx : 7, date : "최근 2개월"},
        {idx : 8, date : "최근 3개월"},
        {idx : 9, date : "최근 6개월"},
        {idx : 10, date : "최근 1년"},
        {idx : 11, date : "최근 2년"},
      ],
      settingdate : "",

      ///////////////////////////////////////////////
      list : [],
      topList : [],

      startdate : "",
      enddate : "",
      kword : "",
      type : "",

      typeActivate : false,  /// 셀렉트박스 활성화 변수

      typeList : [
        {"code" : "all", "title" : "전체검색"},
        {"code" : "name", "title" : "작성자"},
        {"code" : "title", "title" : "제목"},
        {"code" : "content", "title" : "내용"}
      ],


      lang : {
        days : ["일","월","화","수","목","금","토"],
        months:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
        yearFormat: "YYYY년",
        monthFormat: "MM월",
        monthBeforeYear: false
      },
      pager: {
        model: {},
        pageNo: 1,
        pageNum:1,
        totalSize: 100,
        rowSize: 11,
        blockSize: 10,
        endSize:0,
        list: [],
        href:"javascript:void(0);",
        callBack: function (n) {
          this.model.getBoardList(n);
          //this.model.fnOnPostSearchList(n);

        }
      }
    }
  },
  watch : {
    startdate(newval){
      if(newval == null){
        this.startdate == ""
      }
      this.getBoardList(1);
    },
    enddate(newval){
      if(newval == null){
        this.enddate == ""
      }
      this.getBoardList(1);
    },
    settingdate(newval){
      let vm = this

      let date = new Date()

      if(newval == 0 || newval == ""){
        vm.startdate = ""
        vm.enddate = ""
      }else{
        vm.enddate = vm.getNewDate(date)
        vm.startdate = vm.getpastdate(vm.enddate, newval)
      }
    },
  },
  created(){
    this.getBoardList(1);
    //this.$store.commit("setCurrentPage", "noticeBoard");
  },
  methods:{
    getBoardList(n){

      let jsondata = {
        "BBS_TYPE" : 10,
        "PAGE_NUM" : n,
        "BBS_COUNT" : 11,

        "SEARCH_TYPE" : (this.type == "") ? "all" : this.type,
        "SEARCH_WORD" : this.kword,

        "SEARCH_START_DATE" : this.startdate,
        "SEARCH_END_DATE" : this.enddate
      }

      console.log(jsondata);

      listAPI.getNoticeList(jsondata).then((response)=>{

        console.log(response);
        if (response.data["result_info"]['code'] == 1000){

          this.pager.totalSize = response.data["result_data"]['total_bbs_cnt']

          console.log(this.pager.totalSize);

          this.pager.pageNum = (this.pager.pageNo * this.pager.rowSize) - this.pager.rowSize;
          Pager.props = Pager.methods.createPager(this.pager, this, "list");



          this.topList = response.data["result_data"]['ret_query_top']

          this.list = response.data["result_data"]['ret_query']

          console.log(this.topList);
          console.log(this.list);

        }
      })

    },

    getNewDate(date){
      let tmp = new Date(date)
      tmp.setHours(tmp.getHours() - 9);

      let newdate = tmp.getFullYear()+"-"+(((tmp.getMonth()+1) < 10) ? "0"+(tmp.getMonth()+1) : (tmp.getMonth()+1))+"-"+ ((tmp.getDate() < 10) ? "0"+tmp.getDate() : tmp.getDate())

      return newdate
    },

    getpastdate(date, num){
      let vm = this

      let tmp = new Date(date)

      if(num == 1){
        return date
      }else if(num == 2){
        let returndate = new Date(tmp.setDate(tmp.getDate() - 1));

        return vm.getNewDate(returndate)
      }else if(num == 3){
        let returndate = new Date(tmp.setDate(tmp.getDate() - 5));

        return vm.getNewDate(returndate)
      }else if(num == 4){
        let returndate = new Date(tmp.setDate(tmp.getDate() - 7));

        return vm.getNewDate(returndate)
      }else if(num == 5){
        let returndate = new Date(tmp.setDate(tmp.getDate() - 14));

        return vm.getNewDate(returndate)
      }else if(num == 6){
        let returndate = new Date(tmp.setMonth(tmp.getMonth() - 1));

        return vm.getNewDate(returndate)
      }else if(num == 7){
        let returndate = new Date(tmp.setMonth(tmp.getMonth() - 2));

        return vm.getNewDate(returndate)
      }else if(num == 8){
        let returndate = new Date(tmp.setMonth(tmp.getMonth() - 3));

        return vm.getNewDate(returndate)
      }else if(num == 9){
        let returndate = new Date(tmp.setMonth(tmp.getMonth() - 6));

        return vm.getNewDate(returndate)
      }else if(num == 10){
        let returndate = new Date(tmp.setFullYear(tmp.getFullYear() - 1));

        return vm.getNewDate(returndate)
      }else if(num == 11){
        let returndate = new Date(tmp.setFullYear(tmp.getFullYear() - 2));

        return vm.getNewDate(returndate)
      }
    },

    reset1(){
      this.type = "all"
      this.kword = ""

      this.getBoardList(1)
    },

    reset2(){
      this.startdate = ""
      this.enddate = ""

      this.getBoardList(1)
    },




    ////// 셀렉트박스 ////////
    clickType(){
      this.typeActivate = !this.typeActivate
    },

    selecttype(item){
      this.type = item.code
      this.typeActivate = false
    },

    viewtype(item){
      let tmp = this.typeList.find( items => items.code == item )

      return (tmp == null || item == null || item == "") ? "전체검색" : tmp.title
    },

    ////// 셀렉트박스 ////////



    ///////// 페이지 이동/////////////

    NoticeHome(){
      this.$router.push({ name: 'notice_board' }).catch(()=>{});
      return false
    },

    NoticeDetail(item){
      this.$router.push({ name: 'board_detail' , query : { id : item.BBS_ID }}).catch(()=>{});
      return false
    },

    registerNotice(item){
      this.$router.push({ name: 'registration' , query : { BBS_TYPE : 10 }}).catch(()=>{});
      return false
    },

    ///////// 페이지 이동/////////////
  }
}
</script>
<style scoped>
.right .calander{padding-top: 4px;}
@media (min-width:1920px){
  .notice{position: relative; width:100%; padding: 40px 20px 0 20px; margin: 0 auto;}
  .title{overflow: hidden; width: 100%;}
  .title h2{float: left; display: inline-block; text-align: left; font-weight: 700; font-size: 30px; }
  .title h2 p{font-weight: 400; margin-top: 4px; font-size: 14px; color: #808080;}
  .title button{float: right; display: inline-block; width: 60px; height: 40px; background-color: #333; border-radius: 4px; color: #fff; font-size: 16px; font-weight: 400;}
  .search{ margin:20px 0; position: relative; display:flex; justify-content:space-between; align-items:center; }
  .search .select{float: left;}
  .search .select>.all{width:109px; height:40px; line-height:24px; box-sizing: border-box; padding:8px 12px; text-align: left; border: 1px solid #CCCCCC; border-radius: 4px;  color:#838383; font-size:16px; font-weight:400;}
  .search .select .all img{float:right; margin:9px 0; width: 10px; height: 6px;}
  .search .select .all.active{border: 1px solid #326CFF; border-radius: 4px; color:#000;}
  .option_box{display: block; z-index:100; position: absolute; left: 0; top: 42px; background-color:#fff; margin-top:7px; width: 222px; border-radius:3px; border: 1px solid #CCCCCC; filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1));}
  .option_box li{height: 40px; text-align: center; line-height:40px; padding-left:11px; box-sizing: border-box; cursor: pointer; text-align: left;}
  .option_box li:hover{background-color: #E6EDFF;}
  .search_input{display: inline-block; float: left;}
  .search_input input{margin-left:8px; width: 156px; height: 40px; background: #FFFFFF; border: 1px solid #CCCCCC; border-radius: 4px; box-sizing: border-box; padding: 8px 12px; font-size: 16px;}
  .search_reset{margin: 0 8px; width: 73px; height: 40px; background-color: #333; border-radius: 4px; color:#fff; font-size: 16px; font-weight: 400;}
  .serarh_none{background-color: #ccc;}
  .seach_txt{width: 60px; height: 40px; background-color: #326CFF; border-radius: 4px; color:#fff; font-size: 16px; font-weight: 400;}
  .right{display: inherit;}
  .right .calander p{float: left; line-height: 40px; margin-right:8px; font-weight: 400;}
  .right .calander .date{width: 137px; height: 40px; box-sizing: border-box; border: 1px solid #CCCCCC; border-radius: 4px;padding: 8px 12px; font-family: 'Inter var';}
  .date_back{width: 73px; height: 40px; background-color: #ccc; border-radius: 4px; margin-left: 8px;font-size: 16px; color:#fff; }
  .date_back_reset{background-color: #333;}

  .board{border-top: 2px solid #326CFF;}
  .table_all{width: 100%;}
  .table{}
  .table .bold td{text-align: center; font-weight: 700;}
  .table .row{height: 60px; width: 100%; border-bottom: 0.5px solid #ccc;}
  .table .row td{display: inline-block; vertical-align: middle; margin-right: 15px; padding: 5px; box-sizing: border-box; line-height: 53px; height: 60px;}
  .table .row td:last-child{margin-right: 0px;}
  .table .import{background-color: #E5EDFF;}
  .table .import td{font-weight: 700;}
  .tabel_number{width: 4%;}
  .tabel_title{width: 72%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;text-align: left;}
  .tabel_name{width: 5%; text-align: center !important; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .tabel_date{width: 10%;}
  .tabel_view{width: 5%;}
  /* .double_arrow_left{background: url('@/assets/images/left_arrow_double.png'); background-size: contain; width: 12px; height: 10px;} */
  .double_arrow_left.none_active{background: url('@/assets/images/left_arrow_double_none.png'); background-size: contain; width: 12px; height: 10px;}
  .one_arrow_left{background: url('@/assets/images/left_arrow.png'); background-size: contain; width: 6px; height: 10px;}
  .one_arrow_left.none_active{background: url('@/assets/images/left_arrow_none.png'); background-size: contain; width: 6px; height: 10px;}
  /* .one_arrow_right{background: url('@/assets/images/right_arrow.png'); background-size: contain; width: 6px; height: 10px;} */
  .one_arrow_right.none_active{background: url('@/assets/images/right_arrow_none.png'); background-size: contain; width: 6px; height: 10px;}
  /* .double_arrow_right{background: url('@/assets/images/right_arrow_double.png'); background-size: contain; width: 12px; height: 10px;} */
  .double_arrow_right.none_active{background: url('@/assets/images/right_arrow_double_none.png'); background-size: contain; width: 12px; height: 10px;}
  .btn_number{margin-left: 28px;}
  .btn_number.active p{color: #326CFF;}
  .btn_number:nth-child(3){margin-left: 0px;}
}

@media all and (max-width:1919px){
  /*common*/
  .notice{position: relative; overflow: hidden; width:100%; padding:40px 40px; margin: 0 auto;}
  .title{overflow: hidden; width: 100%;}
  .title h2{float: left; display: inline-block; text-align: left; font-weight: 700; font-size: 30px; }
  .title h2 p{font-weight: 400; margin-top: 4px; font-size: 14px; color: #808080;}
  .title button{float: right; display: inline-block; width: 60px; height: 40px; background-color: #333; border-radius: 4px; color: #fff; font-size: 16px; font-weight: 400;}
  .search{ margin:20px 0; position: relative; display:flex; justify-content:space-between; align-items:center; }
  .search .select{float: left;}
  .search .select>.all{width:109px; height:40px; line-height:24px; box-sizing: border-box; padding:8px 12px; text-align: left; border: 1px solid #CCCCCC; border-radius: 4px;  color:#838383; font-size:16px; font-weight:400;}
  .search .select .all img{float:right; margin:9px 0; width: 10px; height: 6px;}
  .search .select .all.active{border: 1px solid #326CFF; border-radius: 4px; color:#000;}
  .option_box{z-index: 100; display: block; position: absolute; left: 0; top: 42px; background-color:#fff; margin-top:7px; width: 222px; border-radius:3px; border: 1px solid #CCCCCC; filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1));}
  .option_box li{height: 40px; text-align: center; line-height:40px; padding-left:11px; box-sizing: border-box; cursor: pointer; text-align: left;}
  .option_box li:hover{background-color: #E6EDFF;}
  .search_input{display: inline-block; float: left;}
  .search_input input{margin-left:8px; width: 156px; height: 40px; background: #FFFFFF; border: 1px solid #CCCCCC; border-radius: 4px; box-sizing: border-box; padding: 8px 12px; font-size: 16px;}

  .search_reset{margin: 0 8px; width: 73px; height: 40px; background-color: #333; border-radius: 4px; color:#fff; font-size: 16px; font-weight: 400;}
  .serarh_none{background-color: #ccc;}
  .seach_txt{width: 60px; height: 40px; background-color: #326CFF; border-radius: 4px; color:#fff; font-size: 16px; font-weight: 400;}
  .right{display: inherit;}
  .right .calander{}
  .right .calander p{float: left; line-height: 40px; margin-right:8px; font-weight: 400;}
  .right .calander .date{width: 125px; height: 40px; box-sizing: border-box; border: 1px solid #CCCCCC; border-radius: 4px; padding: 8px 12px; font-family: 'Inter var'; font-size: 14px;}
  .right button{height: 40px; border-radius: 4px; margin-left: 8px;font-size: 16px; color:#fff }
  .date_back{width: 73px; height: 40px; background-color: #ccc; border-radius: 4px; margin-left: 8px;font-size: 16px; color:#fff; }
  .date_back_reset{background-color: #333;}
  input[type='date']::before {content: attr(data-placeholder); width: 100%;}
  input[type='date']:focus::before, input[type='date']:valid::before { display: none;}
  .board{border-top: 2px solid #326CFF;}
  .table_all{width: 100%; table-layout: fixed;}
  .table{}
  .table .bold td{text-align: center; font-weight: 700;}
  .table .row{height: 60px; width: 100%; border-bottom: 0.5px solid #ccc;}
  .table .row td{display: inline-block; vertical-align: middle; margin-right: 15px; padding: 5px; box-sizing: border-box; line-height: 53px; height: 60px;}
  .table .row td:last-child{margin-right: 0px;}
  .table .import{background-color: #E5EDFF;}
  .table .import td{font-weight: 700;}
  .tabel_number{width: 6%;}
  .tabel_title{width: 60%; display: block;text-align: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
  .tabel_name{width: 8%; text-align: center !important; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .tabel_date{width: 11%; text-align: center; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
  .tabel_view{width: 8%;}

  /* .double_arrow_left{background: url('@/assets/images/left_arrow_double.png'); background-size: contain; width: 12px; height: 10px;} */
  .double_arrow_left.none_active{background: url('@/assets/images/left_arrow_double_none.png'); background-size: contain; width: 12px; height: 10px;}
  .one_arrow_left{background: url('@/assets/images/left_arrow.png'); background-size: contain; width: 6px; height: 10px;}
  .one_arrow_left.none_active{background: url('@/assets/images/left_arrow_none.png'); background-size: contain; width: 6px; height: 10px;}
  .one_arrow_right{background: url('@/assets/images/right_arrow.png'); background-size: contain; width: 6px; height: 10px;}
  /* .one_arrow_right.none_active{background: url('@/assets/images/right_arrow_none.png'); background-size: contain; width: 6px; height: 10px;} */
  .double_arrow_right{background: url('@/assets/images/right_arrow_double.png'); background-size: contain; width: 12px; height: 10px;}
  .double_arrow_right.none_active{background: url('@/assets/images/right_arrow_double_none.png'); background-size: contain; width: 12px; height: 10px;}
  .btn_number{margin-left: 28px;}
  .btn_number.active p{color: #326CFF;}
  .btn_number:nth-child(3){margin-left: 0px;}

}
</style>
