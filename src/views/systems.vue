<template>
  <Row>
    <Col span="12" offset='2'>
    <Card>
      <h3 slot="title">
        <Icon type="settings"></Icon>
        系统设置
      </h3>

      <Row>
        <Col span="11">
        <Menu width='140px'>
          <MenuItem name="4-1">
          <Icon type="ios-cog"></Icon>系统</MenuItem>
          <MenuItem name="4-2">
          <Icon type="code-working"></Icon>PHP</MenuItem>
          <MenuItem name="4-3">
         <Icon type="briefcase"></Icon>数据库</MenuItem>
        </Menu>
        </Col>
        <Col span="11">
        <ul>
          <li v-for="item in movieList" :key="item.name">
            <a :href="item.url" target="_blank">{{ item.name }}</a>
            <span>
              <Icon type="ios-star" v-for="n in 4" :key="n"></Icon>
              <Icon type="ios-star" v-if="item.rate >= 9.5"></Icon>
              <Icon type="ios-star-half" v-else></Icon>
              {{ item.rate }}
            </span>
          </li>
        </ul>
        </Col>
      </Row>

    </Card>
    </Col>
  </Row>
</template>
<script>
export default {

  data() {

    return {
      movieList: [
        {
          name: 'The Shawshank Redemption',
          url: 'https://movie.douban.com/subject/1292052/',
          rate: 9.6
        },
        {
          name: 'Leon:The Professional',
          url: 'https://movie.douban.com/subject/1295644/',
          rate: 9.4
        },
        {
          name: 'Farewell to My Concubine',
          url: 'https://movie.douban.com/subject/1291546/',
          rate: 9.5
        },
        {
          name: 'Forrest Gump',
          url: 'https://movie.douban.com/subject/1292720/',
          rate: 9.4
        },
      ]    }  }
}
</script>


