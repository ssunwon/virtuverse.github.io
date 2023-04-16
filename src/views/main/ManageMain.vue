<template>
  <div>
    <div class="Main_div">
      <h1 class="notice">관리자 메인 <p>virtuverse-Admin</p></h1>
      <div class="main main_con">
        <b class="main_b">회원 현황</b>
        <div class="table_line">
          <table class="main_table">
          <thead>
            <tr>
              <th>날짜</th>
              <th>회원가입</th>
              <th>회원탈퇴</th>
            </tr>
          </thead>
          <tbody>
            <tr  v-for="item in items" :key="item.title">
              <td>{{ item.date }}</td>
              <td>{{ item.join }}</td>
              <td>{{ item.bye }}</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
      <div class="main main_con">
        <b class="main_b">게시글 현황</b>
        <div class="table_line">
          <table class="main_table">
          <thead>
            <tr>
              <th>날짜</th>
              <th>신규</th>
              <th>추천</th>
              <th>차단</th>
            </tr>
          </thead>
          <tbody>
            <tr  v-for="item in board" :key="item.title">
              <td>{{ item.date }}</td>
              <td>{{ item.new }}</td>
              <td>{{ item.good }}</td>
              <td>{{ item.cut }}</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
      <div class="main main_con">
        <b class="main_b">문의 현황</b>
        <div class="table_line">
          <table class="main_table">
          <thead>
            <tr>
              <th>날짜</th>
              <th>신규</th>
              <th>완료</th>
            </tr>
          </thead>
          <tbody>
            <tr  v-for="item in Question" :key="item.title">
              <td>{{ item.date }}</td>
              <td>{{ item.new }}</td>
              <td>{{ item.complete }}</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ManageMain',
  data () {
    return {
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
      Question: [
        { date: ' 오늘 ', new: 0, good: 0, complete: 0 },
        { date: ' 어제 ', new: 0, good: 0, complete: 0 },
        { date: ' 누계 ', new: 0, good: 0, complete: 0 }
      ]
    }
  }
}
</script>
<style scoped>
.main{width: 100%; height: inherit; overflow: hidden; padding: 12px;}
.main_con{margin-bottom: 12px;}
.table_line{border: 1px solid #ededed; border-radius: 6px;}
.main_b{text-align: left; width: 100%; display: block; margin-bottom: 6px;}
.main_table{width: 100%; font-size: 14px; }
.main_table thead tr{width: 100%; background: #89A8FF; padding: 6px; font-weight: bold; border-right: 1px solid #ededed;}
.main_table thead th{padding: 6px; border-right: 1px solid #ededed;}
.main_table thead th:first-child{border-radius: 4px 0 0 0;}
.main_table thead th:last-child{border-radius: 0 4px 0 0; border-right: 0px;}
.main_table tbody tr{width: 100%;  border-bottom: 1px solid #ededed;}
.main_table tbody tr:last-child{border-bottom: 0px;}
.main_table tbody td{padding: 6px; border-right: 1px solid #ededed;}
.main_table tbody td:last-child{border-right: 0px;}
</style>
