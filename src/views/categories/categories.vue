<template>
    <div>
        <Button @click="handleSelectAll(true)" type="primary">全选</Button>
        <Button @click="handleSelectAll(false)">取消全选</Button>
        <Table border ref="selection" :columns="columns" :data="userDatas" stripe @on-select-all="selectAlldata"></Table>
        <Page :total="dataCount"  show-elevator show-sizer :page-size="10"></Page>
    </div>
</template>
<script>
    export default {
        data () {
            return {
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
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '路径',
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
                this.$Message.info('当前查看索引' + index);

            },
            selectAlldata(datass){
                this.$Message.success('选择了全部');
                console.log(datass);
            }
        }
    }
</script>
