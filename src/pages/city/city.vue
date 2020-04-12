<template>
  <div>
    <header-top class="head">
      <span slot="goback"
        ><van-icon name="arrow-left" @click="$router.push('/home')"
      /></span>
      <span slot="title">{{ cityInfo.name }}</span>
      <router-link slot="changeCity" to="/home" class="change_city"
        >切换城市</router-link
      >
    </header-top>
    <div class="search">
      <van-search
        v-model="Inputvalue"
        placeholder="请输入搜索关键词"
        autofocus
      />
      <van-button type="info" @click="searchCity">搜索</van-button>
    </div>

    <!-- 搜索内容 -->
    <div class="search_content" v-if="!isShowHistory">
      <ul class="search_info">
        <li
          v-for="(item, index) in searchInfo"
          :key="index"
          @click="toMsite(index, item.geohash)"
        >
          <div>{{ item.name }}</div>
          <div>{{ item.address }}</div>
        </li>
      </ul>
    </div>

    <!-- 历史搜索 -->
    <div class="search_history" v-if="isShowHistory">
      <div class="show_history">搜索历史</div>
      <ul class="search_info">
        <li v-for="(item, index) in placeHistory" :key="index">
          <div>{{ item.name }}</div>
          <div>{{ item.address }}</div>
        </li>
      </ul>
    </div>
    <div class="clearAll" @click="clearAll" v-if="isShowClear">清除所有</div>
  </div>
</template>

<script>
import HeaderTop from '../../components/header/header'
import { Icon, Search, Button } from 'vant'
import http from '../../utils/http.js'
import { setStorage, getStorage, clearStorage } from '../../utils/webStorage.js'

export default {
  data() {
    return {
      cityInfo: {},
      Inputvalue: '',
      searchInfo: [],
      isShowHistory: true,
      placeHistory: [],
      isShowClear: false
    }
  },
  methods: {
    searchCity() {
      this.isShowHistory = false
      http('/pois', {
        city_id: this.$route.params.id,
        keyword: this.Inputvalue
      }).then(res => {
        this.searchInfo = res
      })
    },
    toMsite(index, geohash) {
      const choosePlace = this.searchInfo[index]
      console.log(choosePlace)
      const history = getStorage('placeHistory')
      if (history) {
        this.placeHistory = JSON.parse(history)
        let checkrepeat = false
        this.placeHistory.forEach(item => {
          if (item.geohash === geohash) {
            checkrepeat = true
          }
        })
        if (!checkrepeat) {
          this.placeHistory.push(choosePlace)
        }
      } else {
        this.placeHistory.push(choosePlace)
      }
      setStorage('placeHistory', this.placeHistory)
      // 跳转页面
      this.$router.push('/msite/' + geohash)
    },
    // 获取历史信息
    getHistoryData() {
      if (getStorage('placeHistory')) {
        this.placeHistory = JSON.parse(getStorage('placeHistory'))
        this.isShowClear = true
      } else {
        this.placeHistory = []
      }
    },
    // 清除历史信息
    clearAll() {
      clearStorage()
      this.getHistoryData()
      this.isShowClear = false
    }
  },
  created() {
    http('/cities/' + this.$route.params.id).then(res => {
      this.cityInfo = res
    })
    this.getHistoryData()
  },
  mounted() {},
  components: {
    HeaderTop,
    [Icon.name]: Icon,
    [Search.name]: Search,
    [Button.name]: Button
  }
}
</script>

<style lang="scss" scoped>
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    color: #fff;
    .van-icon {
      color: #fff;
    }
  }
  span:nth-child(1) {
    font-size: 20px;
  }
  span:nth-child(2) {
    font-size: 20px;
  }
  .change_city {
    color: #fff;
    font-size: 15px;
    margin-right: 5px;
  }
}

.search {
  margin-top: 60px;
  border-top: 2px solid #eee;
  border-bottom: 2px solid #eee;
  background-color: #fff;
  padding-bottom: 10px;
  .van-button {
    width: 100%;
    color: #fff;
    font-size: 20px;
    .van-button__text {
      color: #fff;
    }
  }
}

.search_info {
  li {
    height: 82px;
    padding-left: 20px;
    border-bottom: 1px solid #eee;
    background-color: #fff;
    div:nth-child(1) {
      height: 24px;
      transform: translateY(20px);
      font-size: 16px;
    }
    div:nth-child(2) {
      height: 17px;
      font-size: 12px;
      transform: translateY(25px);
      color: #999999;
    }
  }
}

.search_content {
  margin-top: 10px;
  border-top: 2px solid #eee;
}

.search_history {
  .show_history {
    border-bottom: 2px solid #eee;
    font-size: 12px;
    color: #333;
    padding: 4px 0 4px 10px;
  }
}

.clearAll {
  height: 51px;
  font-size: 18px;
  color: #666;
  line-height: 51px;
  text-align: center;
  background-color: #fff;
}
</style>
