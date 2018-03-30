<style lang="less" scoped>
.all-span {
  display: inline-block;
  background: #19be6b;
  padding: 0 8px;
  color: #fff;
  font-weight: bold;
  border-radius: 3px;
}
.card-number {
  display: inline-block;
  padding-left: 10px;
}
</style>

<template>
  <div>
    <Col :span="spans" v-for="item in cardList" :key="item.name">
    <Card :bordered="false">
      <h2 slot="title">{{item.name}}</h2>
      <p slot="extra">
        <span class="all-span">全部</span>
      </p>
      <Icon :type="item.icon" :size="iconSize" :color="iconColor"></Icon>
      <span :style="{'font-size':iconSize+'px'}" class="card-number"> {{item.number}} </span>
    </Card>
    </Col>
  </div>
</template>

<script>

import axios from 'axios';
export default {
  props: {
    cardList: Array,
    spans: {
      type: Number,
      default: 6
    },
    iconSize: {
      type: Number,
      default: 36
    },
    iconColor: {
      type: String,
      default: '#1c2438'
    }
  },
  data() {
    return {
      form: {
        userName: 'iview_admin',
        password: ''
      },
    };
  },
  methods: {

  }
};
</script>

