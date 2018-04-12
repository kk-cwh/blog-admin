<template>
    <div>
        <Button @click="handleSelectAll(true)" type="primary">全选</Button>
        <Button @click="handleSelectAll(false)">取消全选</Button>
        <Table border ref="selection" :columns="columns" :data="userDatas" stripe @on-select-all="selectAlldata"></Table>
        <Page :total="dataCount"  show-elevator show-sizer :page-size="10"></Page>
        <Modal v-model="modal1" title="友链信息" @on-ok="ok" @on-cancel="cancel">
      <Form :model="editRow" label-position="right" :label-width="100">
        <FormItem label="图片">
          <Input v-model="editRow.name"></Input>
        </FormItem>
        <FormItem label="名字">
          <Input v-model="editRow.email"></Input>
        </FormItem>
        <FormItem label="链接">
          <Input v-model="editRow.avatar"></Input>
        </FormItem>
      </Form>
    </Modal>
    </div>
</template>
<script>
    export default {
        data () {
            return {
              modal1:false,
              editRow:{},
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
                        title: '图片',
                        width: 80,
                        key: 'avatar'
                    },
                    {
                        title: '名字',
                        key: 'name'
                    },
                    {
                        title: '链接',
                        key: 'email'
                    },
                     {
                        title: '是否启用',
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
                                }, '编辑'),
                                  h('Button', {
                                    props: {
                                        type: 'error',
                                        icon: 'ios-trash',
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
                                }, '删除'),


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
    }
        }
    }
</script>
