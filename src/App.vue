<template>
  <div id="app" class="app-main">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: this.$store.state.app.themeColor
    };
  },
  mounted() {

  },
  beforeDestroy() {

  },
  methods: {

  }
}
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  overflow: hidden;
}
.app-main {
  width: 100%;
  height: 100%;
}
.margin-left-right-10{
    margin-left: 10px;
    margin-right: 10px;
}

.margin-left-10{
  margin-left: 10px;
}
.margin-right-10{
  margin-right: 10px;
}
.margin-bottom-0{
    margin-bottom: 0;
}
.margin-top-bottom-10{
    margin-top: 10px;
    margin-bottom: 10px;
}
.margin-bottom-10{
  margin-bottom: 10px;
}
.margin-top-10{
  margin-top: 10px;
}
</style>
