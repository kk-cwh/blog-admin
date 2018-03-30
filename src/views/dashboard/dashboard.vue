<style lang="less" scoped>
@import "./dashboard.less";
</style>

<template>
  <div>
    <Row style="background:#eee;padding:20px" :gutter="16">
      <dash-card :cardList="dashList"></dash-card>
    </Row>
  </div>
</template>

<script>
import dashCard from './components/dash-card.vue';
export default {
  components: {
    dashCard

  },
  data() {
    return {
      dashList: [
      ]
    };
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.dashList = [
        { icon: 'ios-people', name: '用户数', number: this.$store.state.app.dashData.userNumber },
        { icon: 'eye', name: '访问数', number: this.$store.state.app.dashData.browNumber },
        { icon: 'ios-paper', name: '文章数', number: this.$store.state.app.dashData.articleNumber },
        { icon: 'chatbubbles', name: '评论数', number: this.$store.state.app.dashData.discussionNumber },
      ]
    }
  }
};
</script>

<style>

</style>
