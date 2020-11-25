<template>
  <div class="row mt-5 justify-content-around">
    <div v-for="hashtag in hashtags" :key=hashtag.id class="col-5 m-1">
      <div class="card-hashtag">
        <h2 class="text-center">{{ hashtag.name }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const DJANGO_URL = process.env.VUE_APP_DJANGO_URL

export default {
  name: 'HashTagList',
  data() {
    return {
      hashtags: []
    }
  },
  methods: {
    setTag() {
      axios.get(`${DJANGO_URL}/api/hashtags/`)
        .then(response => {
          console.log(response.data)
          this.hashtags = response.data
        })
    },
    createTag() {
      const datas = [
        { name: '#소개팅' },
        { name: '#크리스마스' },
        { name: '#연말느낌' },
        { name: '#내맘을알아줘' }
      ] 
      datas.forEach(function (data) {
        axios.post(`${DJANGO_URL}/api/hashtags/`, data, {})
      })
    }
  },
  created() {
    // this.createTag()
    this.setTag()
  }
}
</script>

<style scoped>
.card-hashtag {
  display: flex;
  height: 30vh;
  flex-direction: column;
  justify-content: center;
  border: 0.1rem solid black;
  border-radius: 10px;
  background-color:steelblue;
  color: white;
}

.card-hashtag:hover {
  cursor: pointer;
}
</style>
