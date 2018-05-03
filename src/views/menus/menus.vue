<template>
  <div>
    <Row :gutter="16">
      <Col span="4">
      <Button type="primary">新增标签</Button>
      </Col>
      <Col :xs="{ span: 14, offset: 2 }" :sm="{ span: 8, offset: 8}" :md="{ span: 6, offset: 10 }" :lg="{ span: 4, offset: 12 }">
      <Form label-position="right" :label-width="60">
        <FormItem label="标签:" class="margin-bottom-10">
          <Input type="text" v-model="query" placeholder="Enter tag name"></Input>
        </FormItem>
      </Form>
      </Col>
      <Col span="4">
      <Button type="primary">查询</Button>
      </Col>
    </Row>

    <Tree :data="data2" show-checkbox @on-check-change="showCheck"></Tree>

  </div>
</template>
<script>
export default {
  data() {

    return {
      query: '',
      modal1: false,
      editRow: {},
      modal2: false,
      addRow: {},
      data2: [
      ]
    }

  },

  computed: {

  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$store
        .dispatch("MenuTree")
        .then((result) => {
          console.log(result);
          this.data2 = result.data;
        })
        .catch(() => {
          this.$Message.error("Login Fail!");
        });
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    }
    , changeStatus(index) {
      this.userDatas[index].status = !this.userDatas[index].status;
      //  console.log( this.userDatas)
    },
    show(index) {
      this.modal1 = true;
      this.$Message.info("当前查看索引" + index);
      this.editRow = this.userDatas[index];
    },
    selectAlldata(datass) {
      this.$Message.success('选择了全部');
      console.log(datass);
    }, showCheck() {
      console.log(this.data2);
    }

  }
}
</script>
