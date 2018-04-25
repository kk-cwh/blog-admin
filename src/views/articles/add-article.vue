<style>
@import "simplemde/dist/simplemde.min.css";
@import "highlight.js/styles/atom-one-dark.css";
@import "./markdown.css";
.add-new-tag-con {
  margin-top: 20px;
  border-top: 1px dashed #dbdddf;
  padding: 20px 0;
  height: 60px;
  overflow: hidden;
}
.add-new-tag-enter {
  height: 0;
  margin-top: 0;
  padding: 0px 0;
}
.add-new-tag-enter-active,
.add-new-tag-leave-active {
  transition: all 0.3s;
}
.add-new-tag-enter-to {
  height: 60px;
  margin-top: 20px;
  padding: 20px 0;
}
.add-new-tag-leave {
  height: 60px;
  margin-top: 20px;
  padding: 20px 0;
}
.add-new-tag-leave-to {
  height: 0;
  margin-top: 0;
  padding: 0px 0;
}
.margin-top-10 {
  margin-top: 10px;
}
.publish-button-con {
  border-top: 1px dashed #dbdddf;
  padding: 12px 0 0 0;
}
</style>

<template>
    <div>
        <Row :gutter="32">
            <Col span="16">
            <Card>
                <Row>
                    <Col span="16" offset="4">
                    <Form ref="formValidate" :label-width="60">
                        <FormItem label="标题" prop="name">
                            <Row>
                                <Col span="18">
                                <Input placeholder="Enter 文章标题"></Input>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem label="副标题" prop="subname">
                            <Row>
                                <Col span="18">
                                <Input placeholder="Enter 文章副标题"></Input>
                                </Col>
                            </Row>
                        </FormItem>

                        <FormItem label="页面图片" prop="imageurl">
                            <Row>
                                <Col span="18">
                                <Input placeholder="可粘贴外部链接"> </Input>
                                </Col>
                                <Col span="6">
                                <Upload action="//jsonplaceholder.typicode.com/posts/">
                                    <Button type="success">上传图片</Button>
                                </Upload>
                                </Col>
                            </Row>

                        </FormItem>

                    </Form>
                    </Col>
                </Row>
                <!-- <a href="#" slot="extra">
                    <Icon type="ios-loop-strong"></Icon>
                    Change
                </a> -->
                <textarea id="editor"></textarea>
            </Card>

            </Col>
            <Col span="6">
            <Card>
                <p slot="title">
                    <Icon type="paper-airplane"></Icon>
                    发布
                </p>

                <p class="margin-top-10">
                    <Icon type="ios-calendar-outline"></Icon>&nbsp;&nbsp;
                    <span v-if="publishTimeType === 'immediately'">立即发布</span>
                    <span v-else>定时：{{ publishTime }}</span>
                    <Button v-show="!editPublishTime" size="small" @click="handleEditPublishTime" type="text">修改</Button>
                    <transition name="publish-time">
                        <div v-show="editPublishTime" class="publish-time-picker-con">
                            <div class="margin-top-10">
                                <DatePicker @on-change="setPublishTime" type="datetime" style="width:200px;" placeholder="选择日期和时间"></DatePicker>
                            </div>
                            <div class="margin-top-10">
                                <Button type="primary" @click="handleSavePublishTime">确认</Button>
                                <Button type="ghost" @click="cancelEditPublishTime">取消</Button>
                            </div>
                        </div>
                    </transition>
                </p>
                <Row class="margin-top-10 publish-button-con">
                    <span class="publish-button">
                        <Button @click="handlePreview" icon="eye">预览</Button>
                    </span>
                    <span class="publish-button">
                        <Button @click="handlePublish" :loading="publishLoading" icon="ios-checkmark" style="width:90px;" type="primary">发布</Button>
                    </span>
                    <span class="publish-button">
                        <Button @click="handleSaveDraft">保存草稿</Button>
                    </span>

                </Row>
            </Card>

            <div class="margin-top-10">
                <Card>
                    <p slot="title">
                        <Icon type="navicon-round"></Icon>
                        文章分类
                    </p>

                    <CheckboxGroup v-model="offenUsedClassSelected" @on-change="setClassificationInOffen">
                        <span v-for="item in offenUsedClass" :key="item.title">
                            <Checkbox :label="item.title">{{ item.title }}</Checkbox>
                        </span>
                    </CheckboxGroup>

                </Card>
            </div>
            <div class="margin-top-10">

                <Card>
                    <p slot="title">
                        <Icon type="ios-pricetags-outline"></Icon>
                        标签
                    </p>
                    <Row>
                        <Col span="18">
                        <Select v-model="model10" multiple size="small">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        </Col>
                        <Col span="6">
                        <Button type="primary" v-show="!addingNewTag" @click="handleAddNewTag" size="small">新建</Button>
                        </Col>
                    </Row>
                    <transition name="add-new-tag">
                        <div v-show="addingNewTag" class="add-new-tag-con">
                            <Col span="14">
                            <Input v-model="newTagName" size="small" placeholder="请输入标签名" />
                            </Col>
                            <Col span="5">
                            <Button @click="createNewTag" size="small" type="primary">确定</Button>
                            </Col>
                            <Col span="5">
                            <Button @click="cancelCreateNewTag" size="small" type="ghost">取消</Button>
                            </Col>
                        </div>
                    </transition>
                </Card>

            </div>

            </Col>
        </Row>

    </div>
</template>
<script>
import SimpleMDE from "simplemde";

import emojione from "emojione";
import marked from "marked";
import hljs from "highlight.js";

export default {
  data() {
    return {
      addingNewTag: false,
      newTagName: "",
      publishTime: "",
      publishTimeType: "immediately",
      editPublishTime: false, // 是否正在编辑发布时间,
      publishLoading:false,
      offenUsedClassSelected: [], // 常用目录选中的目录
      classificationFinalSelected: [], // 最后实际选择的目录
      simplemde: "",
      cityList: [
        {
          value: "New York",
          label: "New York"
        },
        {
          value: "London",
          label: "London"
        },
        {
          value: "Sydney",
          label: "Sydney"
        },
        {
          value: "Ottawa",
          label: "Ottawa"
        },
        {
          value: "Paris",
          label: "Paris"
        },
        {
          value: "Canberra",
          label: "Canberra"
        }
      ],
      model10: [],
      offenUsedClass: []
    };
  },
  mounted() {
    let self = this;

    this.simplemde = new SimpleMDE({
      element: document.getElementById("editor"),
      autoDownloadFontAwesome: true,
      forceSync: true,
      previewRender(plainText, preview) {
        preview.className += " markdown";

        return self.parse(plainText);
      }

    });
    this.offenUsedClass = [
      {
        title: "vue实例"
      },
      {
        title: "生命周期"
      },
      {
        title: "模板语法"
      },
      {
        title: "插值"
      },
      {
        title: "缩写"
      }
    ];
  },
  computed: {},
  methods: {
    parse(content) {
      marked.setOptions({
        highlight: code => {
          return hljs.highlightAuto(code).value;
        },
        sanitize: true
      });

      return emojione.toImage(marked(content));
    },
    setClassificationInOffen(selectedArray) {
      this.classificationFinalSelected = selectedArray;
    },
    handleAddNewTag() {
      this.addingNewTag = !this.addingNewTag;
    },
    createNewTag() {
      if (this.newTagName.length !== 0) {
        this.addingNewTag = false;
        setTimeout(() => {
          this.newTagName = "";
        }, 200);
      } else {
        this.$Message.error("请输入标签名");
      }
    },
    cancelCreateNewTag() {
      this.newTagName = "";
      this.addingNewTag = false;
    },
    handleEditPublishTime() {
      this.editPublishTime = !this.editPublishTime;
    },
    setPublishTime(datetime) {
      this.publishTime = datetime;
    },
    handleSavePublishTime() {
      this.publishTimeType = "timing";
      this.editPublishTime = false;
    },
    cancelEditPublishTime() {
      this.publishTimeType = "immediately";
      this.editPublishTime = false;
    },
    handlePreview() {
      this.$store.state.app.md = this.simplemde.value();
       this.$router.push({name: "preview_article"});
    },
    handlePublish() { this.publishLoading = true;},
    handleSaveDraft() {}
  }
};
</script>
