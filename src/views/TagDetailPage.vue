<template>
  <div class="container">
    <h2 class="text-center my-5">{{ tagData.name }}</h2>
    <div class="row justify-content-center">
      <div class="col-sm-12 col-md-6 my-3" v-for="music in tagData.musics" :key=music.id>
        <div class="card">
          <img :src=music.image class="card-img-top" alt="">
          <div class="card-body">
            <div class="music-main">
              <h5 class="card-title">{{ music.name }}</h5>
              <span class="music-artist badge badge-dark oduck" @click="getArtist" :id="music.artist.id">{{ music.artist.name }}</span>
            </div>
            <div class="row">
              <div class="col-10"></div>
              <router-link class="btn btn-primary mt-3" :to="{path: '/music/' + music.id}">곡정보</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'

export default {
  name:'TagDetailPage',
  data() {
    return {
      tagData: {}
    }
  },
  methods: {
    getTagData() {
      axios.get(`http://127.0.0.1:8000/api/tags/${this.$route.params.id}/`)
        .then(response => {
          this.tagData = response.data

        })
    },
    getArtist (event) {
      console.log(event.target.id)
      router.push(`/artist/${event.target.id}`)
    }
  },
  created() {
    this.getTagData()
  }
}
</script>

<style scoped>
.oduck:hover {
  cursor: pointer;
}

.music-main {
  position: relative;
  margin-bottom: 50px;
  height: 100px;
}

.music-title {
  font-size: 30px;
  margin-bottom: 10px;
}

.music-artist {
  position: absolute;
  font-size: 25px;
}

@media (min-width: 0px) and (max-width: 900px){
  .music-main {
    height: 50px;
  }

  .music-title{
    font-size: 15px;
    margin-bottom: 10px;
  }

  .oduck{
    font-size: 10px;
  }
}
</style>
