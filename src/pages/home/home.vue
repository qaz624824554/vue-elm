<template>
  <div>
    <header-top class="head-top">
      <span slot="logo" class="head_logo">ele.me</span>
    </header-top>
    <van-tabs v-model="activeName" animated>
      <van-tab title="定位城市" name="guess">
        <router-link :to="'/city/' + guessCityid" class="guess_city">
          <span>{{ guessCity }}</span>
          <van-icon name="arrow" />
        </router-link>
      </van-tab>
      <van-tab title="热门城市" name="hot">
        <van-grid>
          <van-grid-item
            v-for="item in hotCity"
            :key="item.id"
            :text="item.name"
            :to="'/cities/' + item.id"
          />
        </van-grid>
      </van-tab>
      <van-tab title="所有城市" name="group">
        <section class="group_city_container">
          <ul class="letter_classify">
            <li
              v-for="(value, key, index) in sortgroupcity"
              :key="key"
              class="letter_classify_li"
            >
              <h4 class="city_title">
                {{ key }}
                <span v-if="index == 0">（按字母排序）</span>
              </h4>
              <ul class="groupcity_name_container citylistul clear">
                <router-link
                  tag="li"
                  v-for="item in value"
                  :to="'/city/' + item.id"
                  :key="item.id"
                  class="ellipsis"
                >
                  {{ item.name }}
                </router-link>
              </ul>
            </li>
          </ul>
        </section>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import headerTop from '../../components/header/header'
import { hotCity, guessCity, groupCity } from '../../utils/getData.js'
import { Tab, Tabs, Icon, Grid, GridItem } from 'vant'

export default {
  data() {
    return {
      guessCity: '',
      guessCityid: '',
      hotCity: [],
      groupCity: {},
      activeName: 'guess'
    }
  },
  methods: {},
  components: {
    headerTop,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Icon.name]: Icon,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem
  },
  mounted() {
    guessCity.then(res => {
      this.guessCity = res.name
      this.guessCityid = res.id
    })
    hotCity.then(res => {
      this.hotCity = res
    })
    groupCity.then(res => {
      this.groupCity = res
      console.log(this.groupCity)
    })
  },
  created() {},
  computed: {
    sortgroupcity() {
      const sortobj = {}
      for (let i = 65; i <= 90; i++) {
        if (this.groupCity[String.fromCharCode(i)]) {
          sortobj[String.fromCharCode(i)] = this.groupCity[
            String.fromCharCode(i)
          ]
        }
      }
      return sortobj
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/mixin.scss';

.head_logo {
  position: absolute;
  left: 0;
  top: 0;
  font-size: 18px;
  line-height: 50px;
  margin-left: 8px;
  color: #fff;
}

.van-tabs {
  margin-top: 50px;
}

.guess_city {
  width: 100%;
  height: 50px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  line-height: 50px;
  span {
    color: $blue;
    font-size: 20px;
    margin-left: 20px;
  }
  .van-icon {
    font-size: 20px;
    line-height: 50px;
    margin-right: 5px;
  }
}
.letter_classify_li {
  margin-bottom: 20px;
  border-top: 2px solid #e4e4e4;
  border-bottom: 2px solid #e4e4e4;
  h4 {
    height: 38px;
    line-height: 38px;
    margin-left: 5px;
    border-bottom: 2px solid #e4e4e4;
  }
  span {
    color: #666;
    font-size: 5px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    .ellipsis {
      width: 25%;
      height: 45px;
      text-align: center;
      line-height: 45px;
      border-right: 1px solid #e4e4e4;
      border-bottom: 1px solid #e4e4e4;
    }
  }
}
</style>
