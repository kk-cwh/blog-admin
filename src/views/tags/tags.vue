<template>
    <div>
     <Row :gutter="16">
       <Col span="4">
       <Button @click="toAdd" type="primary">新增标签</Button>
      </Col>
        <Col :xs="{ span: 14, offset: 2 }" :sm="{ span: 8, offset: 8}" :md="{ span: 6, offset: 10 }" :lg="{ span: 4, offset: 12 }" >
       <Form  label-position="right" :label-width="60">
       <FormItem label="标签:" class="margin-bottom-10">
        <Input type="text" v-model="query" placeholder="Enter tag name"></Input>
       </FormItem>
       </Form>
      </Col>
      <Col span="4" >
      <Button type="primary" @click="toQuery">查询</Button>
      </Col>
    </Row>
        <Table border ref="selection" :columns="columns" :data="userDatas" stripe @on-select-all="selectAlldata"></Table>
        <Page :total="dataCount"  show-elevator show-sizer :page-size="10" class="margin-top-10 "></Page>
      <Modal v-model="modal1" title="标签信息" @on-ok="ok" @on-cancel="cancel">
      <Form :model="editRow" label-position="right" :label-width="100">
        <FormItem label="标签">
          <Input v-model="editRow.name"></Input>
        </FormItem>
        <FormItem label="标题">
          <Input v-model="editRow.email"></Input>
        </FormItem>
        <FormItem label="描述">
          <Input v-model="editRow.avatar"></Input>
        </FormItem>
      </Form>
    </Modal>
<Modal v-model="modal2" title="新增标签" @on-ok="ok" @on-cancel="cancel" width="480">
       <Form :model="addRow" label-position="right" :label-width="140">
        <FormItem label="姓名">
          <Input v-model="addRow.name" style="width:200px"></Input>
        </FormItem>
        <FormItem label="邮箱">
          <Input v-model="addRow.email" style="width:200px"></Input>
        </FormItem>
        <FormItem label="头像">
          <Input v-model="addRow.avatar" style="width:200px"></Input>
        </FormItem>
      </Form>
      <div slot="footer" style="color:#f60;text-align:center">
         <Button type="default" @click="cancel">取消</Button>
         <Button type="primary"  @click="ok">保存</Button>
      </div>
    </Modal>
    </div>
</template>
<script>
    export default {
        data () {

            return {
              query:'',
               modal1:false,
               editRow:{},
               modal2:false,
               addRow:{},
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: 'ID',
                        width: 60,
                        key: 'id'
                    },
                    {
                        title: '标签',
                        width: 80,
                        key: 'avatar'
                    },
                    {
                        title: '标题',
                        key: 'name'
                    },
                    {
                        title: '描述',
                        key: 'email'
                    },
                     {
                        title: '状态',
                        key: 'status',
                        width:90,
                        render:(h, params) => {
                          return h('div',[h('i-switch',{
                            props: {
                                        value: params.row.status,
                                        size:'large'
                                    },
                                    scopedSlots:{
                                      open:()=>{
                                        return '启用';
                                      },
                                      close:()=>{
                                        return '停用';
                                      }
                                    },
                                    on: {
                                        'on-change': (status) => {
                                            this.changeStatus(params.index)
                                        }
                                    }
                          })]);
                        }
                    }
                    ,
                     {
                        title: '创建时间',
                        key: 'created_at'
                    },{
                      title:'操作',
                      key:'action',
                      render: (h, params) => {
                            return h('div', [
                              h('Button', {
                                    props: {
                                        type: 'success',
                                        icon: 'eye',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '查看'),
                                  h('Button', {
                                    props: {
                                        type: 'error',
                                        icon: 'compose',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '编辑')


                            ]);
                        }
                    }
                ],
                userDatas: [
                    {
                        id:1,
                        name: 'John Brown',
                        avatar: 18,
                        email: 'New York No. 1 Lake Park',
                        status: false,
                        created_at: '2016-10-03'
                    },
                    {
                        id:2,
                        name: 'John Brown',
                        avatar: 18,
                        email: 'New York No. 1 Lake Park',
                        status: false,
                        created_at: '2016-10-03'
                    },
                     {
                        id:3,
                        name: 'John Brown',
                        avatar: 18,
                        email: 'New York No. 1 Lake Park',
                        status: true,
                        created_at: '2016-10-03'
                    },
                     {
                        id:4,
                        name: 'John Brown',
                        avatar: 18,
                        email: 'New York No. 1 Lake Park',
                        status: false,
                        created_at: '2016-10-03'
                    }
                ]
            }
        },
        computed:{
dataCount:function(){
  return this.userDatas.length;
}
        },
        methods: {
            handleSelectAll (status) {
                this.$refs.selection.selectAll(status);
            }
            ,changeStatus(index){
               this.userDatas[index].status = !this.userDatas[index].status;
              //  console.log( this.userDatas)
            },
            show(index){
               this.modal1 = true;
               this.$Message.info("当前查看索引" + index);
               this.editRow = this.userDatas[index];
            },
            selectAlldata(datass){
                this.$Message.success('选择了全部');
                console.log(datass);
            } ,
            ok() {
              console.log('ok')
            },
            cancel() {
              console.log('cancel')
            }, toQuery() {
      console.log('query', this.query)
    },
            toAdd() {
              this.modal2=true;
            }
                }
    }
</script>
