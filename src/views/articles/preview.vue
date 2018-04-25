<template>
  <div class=" markdown " v-html="rawHtml"></div>
</template>

<script>
import emojione from 'emojione'
import marked from 'marked'
import hljs from 'highlight.js'
export default {

  data() {
    return {
      rawHtml: ''
    }
  },
  mounted() {
    this.rawHtml = this.parse(this.$store.state.app.md)
  },
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
  },
}

</script>
<style>

@import "simplemde/dist/simplemde.min.css";
@import "highlight.js/styles/atom-one-dark.css";
@import "./markdown.css";
</style>

