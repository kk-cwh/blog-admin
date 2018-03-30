<style lang="less">
@import "./home.less";
//@import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <Row :gutter="10">
            <Col :md="24" :lg="8" :offset="8">
            <Row class-name="home-page-row1" :gutter="10">
                <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
                <Card>
                    <Row type="flex" class="user-infor">
                        <Col span="8">
                        <Row class-name="made-child-con-middle" type="flex" align="middle">
                            <img class="avator-img" :src="avatorPath" />
                        </Row>
                        </Col>
                        <Col span="16" style="padding-left:6px;">
                        <Row class-name="made-child-con-middle" type="flex" align="middle">
                            <div>
                                <b class="card-user-infor-name">{{userName}}</b>
                                <p>super admin</p>
                            </div>
                        </Row>
                        </Col>
                    </Row>
                    <div class="line-gray"></div>
                    <Row class="margin-top-8">
                        <Col span="8">
                        <p class="notwrap">上次登录时间:</p>
                        </Col>
                        <Col span="16" class="padding-left-8">{{lastLoginTime}}</Col>
                    </Row>
                    <Row class="margin-top-8">
                        <Col span="8">
                        <p class="notwrap">上次登录地点:</p>
                        </Col>
                        <Col span="16" class="padding-left-8" >{{area}}</Col>
                    </Row>
                </Card>
                </Col>

            </Row>
            </Col>

        </Row>

    </div>
</template>

<script>
// import cityData from './map-data/get-city-value.js';
// import homeMap from './components/map.vue';
// import dataSourcePie from './components/dataSourcePie.vue';
// import visiteVolume from './components/visiteVolume.vue';
// import serviceRequests from './components/serviceRequests.vue';
// import userFlow from './components/userFlow.vue';
// import countUp from './components/countUp.vue';
// import inforCard from './components/inforCard.vue';
// import mapDataTable from './components/mapDataTable.vue';
// import toDoListItem from './components/toDoListItem.vue';
import Cookies from 'js-cookie';
export default {
    name: 'home',
    components: {
        // homeMap,
        // dataSourcePie,
        // visiteVolume,
        // serviceRequests,
        // userFlow,
        // countUp,
        // inforCard,
        // mapDataTable,
        // toDoListItem
    },
    data () {
        return {
            lastLoginTime: '2018-01-02 12:34:23',
            area: '北京'
        };
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        },
        userName () {
            return Cookies.get('user');
        }
    },
    methods: {
        addNewToDoItem () {

        },
        addNew () {
            if (this.newToDoItemValue.length !== 0) {
                this.toDoList.unshift({
                    title: this.newToDoItemValue
                });
                setTimeout(() => {
                    this.newToDoItemValue = '';
                }, 200);
                this.showAddNewTodo = false;
            } else {
                this.$Message.error('请输入待办事项内容');
            }
        },
        cancelAdd () {
            this.showAddNewTodo = false;
            this.newToDoItemValue = '';
        }
    }
};
</script>
