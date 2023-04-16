<template>
  <div>
    <div class="Main_div">
      <h1 class="notice">차단회원</h1>
      <div class="main_header bulletin_up">
          <div>
            <select class="sort input_box sub_title_box">
              <option v-for="(item, index) in selectList" :key="index" :value="item.value">{{ item.name }}</option>
            </select>
          </div>
          <div><input type="text" class="input_box sub_title_box search_input" placeholder="검색어를 입력해주세요"></div>
          <div>
            <select class="date_Select input_box sub_title_box">
              <option v-for="(item, index) in wirte_date" :key="index" :value="item.value">{{ item.name }}</option>
            </select>
          </div>
          <div class="date_div">
            <div>
              <Datepicker class="datepicker" v-model="picked" style="
                width: 120px;
                height: 32px;
                border-radius: 4px;
                border: 1px solid #ccc;
                padding: 4px 12px;
                box-sizing: border-box;
                margin-right:4px;
            "/>
            </div>
            <div><p>~</p></div>
            <div>
              <Datepicker class="datepicker" v-model="picked" style="
                  width: 120px;
                  height: 32px;
                  border-radius: 4px;
                  border: 1px solid #ccc;
                  padding: 4px 12px;
                  box-sizing: border-box;
                  margin-left:4px;
              "/>
            </div>
          </div>
        <div class="bulletin_up_2">
          <div><p>회원유형 :&nbsp;&nbsp;</p></div>
          <div>
            <select class="sort input_box sub_title_box">
            <option v-for="(item, index) in type" :key="index" :value="item.value">{{ item.typelist }}</option>
          </select>
          </div>
          <div><button class="all_blue search_btn">검색</button></div>
        </div>
      </div>
      <div></div>
      <div class="main main_con">
        <div class="cut_off_btn">
          <button class="red_btn">차단설정</button>
          <button class="all_red">탈퇴</button>
        </div>
        <b class="main_b">게시글 현황</b>
        <div class="table_line">
          <div class="board">
        <table class="table_all">
          <thead class="table">
          <tr class="row bold">
            <th>
              <div class="check_input">
                <input type="checkbox" id="allchecked"><label for="allchecked" class="private"></label>
              </div>
            </th>
            <th>회원번호</th>
            <th>닉네임</th>
            <th>회원유형</th>
            <th>이름</th>
            <th>연락처</th>
            <th>차단사유</th>
            <th>마지막 로그인</th>
          </tr>
        </thead>
        <tbody>
          <tr class="row import" v-for="(item, index) in topList" :key="index">
            <td class="check">
              <div class="check_input">
                <input type="checkbox"><label :for="'private_'+index" class="private"></label>
              </div>
            </td>
            <td class="tabel_number">{{item.number}}</td>
            <td class="tabel_title"><a>{{item.nickname}}</a></td>
            <td class="tabel_name">{{item.type}}</td>
            <td class="tabel_date">{{item.name}}</td>
            <td class="tabel_view">{{item.phone_number}}</td>
            <td class="tabel_view">{{item.reason}}</td>
            <td class="tabel_view">{{item.login}}</td>
          </tr>
        </tbody>
        </table>
      </div>
        </div>
          <div class="pager">
            <b class="pager_b">검색결과 100건</b>
            <div class="pager_arrow">
              <img src="@/assets/image/left_arrow_none.png" alt="left_arrow_none">
              <div class="pager_list">
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
              </div>
              <img src="@/assets/image/right_arrow_none.png" alt="right_arrow_none">
            </div>
            <div>
            <select class="sort input_box sub_title_box">
            <option v-for="(item, index) in page" :key="index" :value="item.value">{{ item.pagelist }}</option>
          </select>
          </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import Datepicker from 'vue3-datepicker'
import { ref } from 'vue'
const picked = ref(new Date())
export default {
  name: 'BlockingMem',
  components: { Datepicker },
  data () {
    return {
      picked,
      date: null,
      items: [
        { date: ' 오늘 ', join: 0, bye: 0 },
        { date: ' 어제 ', join: 0, bye: 0 },
        { date: ' 누계 ', join: 0, bye: 0 }
      ],
      board: [
        { date: ' 오늘 ', new: 0, good: 0, cut: 0 },
        { date: ' 어제 ', new: 0, good: 0, cut: 0 },
        { date: ' 누계 ', new: 0, good: 0, cut: 0 }
      ],
      selectList: [
        { name: '제목', value: '' },
        { name: '내용', value: 'a' },
        { name: '닉네임', value: 'b' },
        { name: '회원번호', value: 'C' }
      ],
      wirte_date: [
        { name: '가입일', value: '' },
        { name: '마지막 로그인', value: '' }
      ],
      type: [
        { typelist: '일반', value: '' },
        { typelist: '버튜버', value: '' }
      ],
      page: [
        { pagelist: '10/page', value: '' },
        { pagelist: '50/page', value: '' },
        { pagelist: '100/page', value: '' }
      ],
      topList: [
        { number: '100', nickname: '와우', type: '일반', name: '정영교', phone_number: '010-1234-5496', reason: '별로임', login: '2023-03-15' },
        { number: '100', nickname: '와우', type: '일반', name: '정영교', phone_number: '010-1234-5496', reason: '별로임', login: '2023-03-15' },
        { number: '100', nickname: '와우', type: '일반', name: '정영교', phone_number: '010-1234-5496', reason: '별로임', login: '2023-03-15' },
        { number: '100', nickname: '와우', type: '일반', name: '정영교', phone_number: '010-1234-5496', reason: '별로임', login: '2023-03-15' },
        { number: '100', nickname: '와우', type: '일반', name: '정영교', phone_number: '010-1234-5496', reason: '별로임', login: '2023-03-15' },
        { number: '100', nickname: '와우', type: '일반', name: '정영교', phone_number: '010-1234-5496', reason: '별로임', login: '2023-03-15' },
        { number: '100', nickname: '와우', type: '일반', name: '정영교', phone_number: '010-1234-5496', reason: '별로임', login: '2023-03-15' },
        { number: '100', nickname: '와우', type: '일반', name: '정영교', phone_number: '010-1234-5496', reason: '별로임', login: '2023-03-15' }
      ]
    }
  },
  props: {
  }
}
</script>
<style scoped>
.main_header{height: 96px;}
.bulletin_up>div{float: left; margin-right: 4px;}
.bulletin_up_1{width: 100%;}
.sort{width: 100px;}
.date_div{margin: 0;}
.date_div div{float: left;}
.date_div div p{height: 32px; line-height: 32px;}
.table_line{border: 1px solid #ededed; border-radius: 6px;}
.search_input{width: 180px;}
.main_b{text-align: left; width: 100%; display: block; margin-bottom: 6px; font-size: 18px;}
.main_table{width: 100%; font-size: 14px; }
.main_table thead tr{width: 100%; background: #89A8FF; padding: 6px; font-weight: bold; border-right: 1px solid #ededed;}
.main_table thead th{padding: 6px; border-right: 1px solid #ededed;}
.main_table thead th:first-child{border-radius: 4px 0 0 0;}
.main_table thead th:last-child{border-radius: 0 4px 0 0; border-right: 0px;}
.main_table tbody tr{width: 100%;  border-bottom: 1px solid #ededed;}
.main_table tbody tr:last-child{border-bottom: 0px;}
.main_table tbody td{padding: 6px; border-right: 1px solid #ededed;}
.main_table tbody td:last-child{border-right: 0px;}
.bulletin_up_2{width: 100%; margin-top: 8px;}
.bulletin_up_2 div{float: left;}
.bulletin_up_2 div p{height: 32px; line-height: 32px;}
.search_btn{height: 32px; width: 60px; margin-left: 4px;}
.cut_off_btn{overflow: hidden; text-align: right; display: block; width: 100%;}
.cut_off_btn button{height: 32px; width: 60px; margin-left: 4px;}
.board{border-top: 2px solid #326CFF;}
.table_all{width: 100%;}
.table{}
.table tr{}
.table tr th{width: auto; float: left; height: 60px; line-height: 60px;}
.table_all thead tr th:first-child{width: 2%;}
.table_all thead tr th:nth-child(2){width: 10%;}
.table_all thead tr th:nth-child(3){width: 10%;}
.table_all thead tr th:nth-child(4){width: 15%;}
.table_all thead tr th:nth-child(5){width: 10%;}
.table_all thead tr th:nth-child(6){width: 15%;}
.table_all thead tr th:nth-child(7){width: 15%;}
.table_all thead tr th:nth-child(8){width: 15%;}
.table_all tbody tr{}
.table_all tbody tr td{}
.table_all tbody tr td:first-child{width: 2%;}
.table_all tbody tr td:nth-child(2){width: 10%;}
.table_all tbody tr td:nth-child(3){width: 10%;}
.table_all tbody tr td:nth-child(4){width: 15%;}
.table_all tbody tr td:nth-child(5){width: 10%;}
.table_all tbody tr td:nth-child(6){width: 15%;}
.table_all tbody tr td:nth-child(7){width: 15%;}
.table_all tbody tr td:nth-child(8){width: 15%;}
.check_input{width: auto; height: 60px; line-height: 68px; text-align: left;}
.table_all tbody tr td{text-align: center;}
.table_all .bold td{ font-weight: 700;}
.table_all .row{height: 60px; width: 100%; border-bottom: 0.5px solid #ccc;}
.table_all .row td{display: inline-block; vertical-align: middle; box-sizing: border-box; line-height: 60px; height: 60px; width: auto; float: left;}
.table_all .row td:last-child{margin-right: 0px;}
/* .table_all .import{background-color: #E5EDFF;} */
.tabtable_all .import td{font-weight: 700;}
.tabel_number{width: 4%;}
.tabel_title{width: 72%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;text-align: left;}
.check_input input[type=checkbox] {display:none;}
.check_input input[type=checkbox] + .private{box-sizing: border-box; padding-left: 9px; cursor: pointer;  width: 20px; height: 20px; border-radius: 8px; background-color: #CCC;position: relative; display: inline-block; margin-left: 18px; vertical-align: baseline;}
.check_input input[type=checkbox]:hover + .private{ cursor: pointer;  width: 20px; height: 20px; border-radius: 8px; background-color: #326CFF;position: relative; display: block;}
.check_input input:checked + .private{ cursor: pointer;  width: 20px; height: 20px; border-radius: 8px; background-color:#326CFF;position: relative; display: block;}
.check_input input[type=checkbox] + label::after{position: absolute; content: ""; background: url(@/assets/image/check.png) no-repeat; background-size: contain; width: 10px; height: 10px; left:50%; top:50%; transform: translate(-50%,-50%); }
.pager{float: right; margin-top:16px;}
.pager div{display: inline-block; vertical-align: middle;}
.pager .pager_b{}
.pager .pager_arrow{margin-right: 20px;}
.pager .pager_arrow img{width: 8px; height: 8px; margin-left: 20px;}
.pager .pager_list{}
.pager .pager_list p{float:left; padding-left: 20px;}
</style>
