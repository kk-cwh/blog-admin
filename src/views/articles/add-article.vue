<style>
@import "simplemde/dist/simplemde.min.css";
@import "highlight.js/styles/atom-one-dark.css";
@import "./markdown.css";
</style>

<template>
    <div>
        <Row :gutter="16">
            <Col span="18">
            <Card>
                <Row>
                    <Col span="16" offset="4">
                    <Form ref="formValidate" :label-width="60">
                        <FormItem label="标题" prop="name">
                            <Row>
                                <Col span="24">
                                <Input placeholder="Enter 文章标题"></Input>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem label="副标题" prop="subname">
                             <Row>
                                <Col span="24">
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
            <div class="margin-top-10">
                <Card>
                    <p slot="title">
                        <Icon type="ios-pricetags-outline"></Icon>
                        标签
                    </p>
                    <Row>
                        <Col span="18">
                       
                        </Col>
                        <Col span="6" class="padding-left-10">
                        <Button long type="ghost">新建</Button>
                        </Col>
                    </Row>
                    <transition name="add-new-tag">
                        <div  class="add-new-tag-con">
                            <Col span="14">
                            <Input placeholder="请输入标签名" />
                            </Col>
                            <Col span="5" class="padding-left-10">
                            <Button type="primary">确定</Button>
                            </Col>
                            <Col span="5" class="padding-left-10">
                            <Button  long type="ghost">取消</Button>
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

import emojione from 'emojione';
import marked from 'marked';
import hljs from 'highlight.js';

export default {
  data() {
    return {
        simplemde:''
    };
  },
  mounted() {
    let self = this;

    this.simplemde = new SimpleMDE({
      element: document.getElementById("editor"),
      autoDownloadFontAwesome: true,
      forceSync: true,
       previewRender(plainText, preview) {
        
        preview.className += ' markdown'

        return self.parse(plainText)
      },
    });
  },
  computed: {},
  methods: {
     parse(content) {
      marked.setOptions({
        highlight: (code) => {
          return hljs.highlightAuto(code).value
        },
        sanitize: true
      })

      return emojione.toImage(marked(content))
    },

  }
};
</script>
