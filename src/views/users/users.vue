<template>
  <div>
    <Row :gutter="16">
      <Col :xs="{ span: 10, offset: 8 }" :sm="{ span: 8, offset: 12}" :md="{ span: 6, offset: 14 }" :lg="{ span: 4, offset: 16 }" >
       <Form  label-position="right" :label-width="60">
       <FormItem label="用户名:">
        <Input type="text" v-model="query" placeholder="Enter user name"></Input>
       </FormItem>
       </Form>
      </Col>
      <Col span="4" >
      <Button type="primary" @click="toQuery">查询</Button>
      </Col>
    </Row>
     <Button @click="handleSelectAll(true)" type="primary">全选</Button>
      <Button @click="handleSelectAll(false)">取消全选</Button>
    <Table border ref="selection" :columns="columns" :data="userDatas" stripe @on-select-all="selectAlldata"></Table>
    <Page :total="dataCount" show-elevator show-sizer :page-size="10"></Page>

    <Modal v-model="modal1" title="用户信息" @on-ok="ok" @on-cancel="cancel">
      <Form :model="editRow" label-position="right" :label-width="100">
        <FormItem label="姓名">
          <Input v-model="editRow.name"></Input>
        </FormItem>
        <FormItem label="邮箱">
          <Input v-model="editRow.email"></Input>
        </FormItem>
        <FormItem label="头像">
          <Input v-model="editRow.avatar"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      query:'',
      modal1: false,
      editRow: {},
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "ID",
          width: 60,
          key: "id"
        },
        {
          title: "头像",
          width: 80,
          key: "avatar"
        },
        {
          title: "用户名",
          key: "name"
        },
        {
          title: "邮箱",
          key: "email"
        },
        {
          title: "状态",
          key: "status",
          width: 90,
          render: (h, params) => {
            return h("div", [
              h("i-switch", {
                props: {
                  value: params.row.status,
                  size: "large"
                },
                scopedSlots: {
                  open: () => {
                    return "启用";
                  },
                  close: () => {
                    return "停用";
                  }
                },
                on: {
                  "on-change": status => {
                    this.changeStatus(params.index);
                  }
                }
              })
            ]);
          }
        },
        {
          title: "创建时间",
          key: "created_at"
        },
        {
          title: "操作",
          key: "action",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    icon: "eye",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "查看"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    icon: "compose",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ],
      userDatas: [
        {
          id: 1,
          name: "John Brown",
          avatar: 18,
          email: "New York No. 1 Lake Park",
          status: false,
          created_at: "2016-10-03"
        },
        {
          id: 2,
          name: "John Brown",
          avatar: 18,
          email: "New York No. 1 Lake Park",
          status: false,
          created_at: "2016-10-03"
        },
        {
          id: 3,
          name: "John Brown",
          avatar: 18,
          email: "New York No. 1 Lake Park",
          status: true,
          created_at: "2016-10-03"
        },
        {
          id: 4,
          name: "John Brown",
          avatar: 18,
          email: "New York No. 1 Lake Park",
          status: false,
          created_at: "2016-10-03"
        }
      ]
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    dataCount: function () {
      return this.userDatas.length;
    }
  },
  methods: {
    init() {
      this.$store
        .dispatch("UserList", { page: 1 })
        .then((result) => {
          console.log(result);
          this.userDatas = result.data.list;
        })
        .catch(() => {
          this.$Message.error("Login Fail!");
        });
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    changeStatus(index) {
      this.userDatas[index].status = !this.userDatas[index].status;
      //  console.log( this.userDatas)
    },
    show(index) {
      this.modal1 = true;
      this.$Message.info("当前查看索引" + index);
      this.editRow = this.userDatas[index];
    },
    selectAlldata(datass) {
      this.$Message.success("选择了全部");
      console.log(datass);
    },
    ok() {
      console.log('ok')
    },
    cancel() {
      console.log('cancel')
    },toQuery(){
      console.log('query',this.query)
    }
  }
};
</script>
