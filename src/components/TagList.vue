<template>
  <div class="row mt-5 justify-content-around">
    <router-link v-for="tag in tags" :key=tag.id :to="{path: '/tags/' + tag.id}" class="tag-card m-2">
      <h2>{{ tag.name }}</h2>
    </router-link>
    <div v-if="tags.length === 0">
      <h2 class="text-center my-5">서버와의 연결이 불안정합니다 :)</h2>
      <h3 class="text-center my-5">잠시 후 새로고침해주세요!</h3>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TagList',
  data() {
    return {
      tags: []
    }
  },
  methods: {
    setTag() {
      axios.get('http://127.0.0.1:8000/api/tags/')
        .then(response => {
          console.log(response.data)
          this.tags = response.data
        })
    },
  },
  created() {
    this.setTag()
  }
}
</script>

<style scoped>
.tag-card {
  width: 200px;
  height: 200px;
  padding: 0 10px;
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: black;
}

</style>

