<template>
  <div class="container">
    <h2>Artist Page Fan Page</h2>
    <div class="card mb-3">
      <img :src="artistData.image" v-if="artistData.name !== 'Various Artists'" class="card-img-top" alt="image" >
      <div class="card-body">
        <h5 class="card-title">{{ artistData.name }}</h5>

        <p class="card-text"><span class="text-muted">Song List</span></p>
        <div class="row justify-content-center">
          <div v-for="music in artistData.musics" :key="music.id"
            class="col-3 no-gutters p-0 m-1">
            <img :src="music.album.image" class="card-img">
            <div class="card-img-overlay music-title d-flex  align-items-center" @click="goSongInfo(music.id)">
              <p class="card-title music-text">{{ music.name }}</p>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center mt-5 mb-3">
          <button v-if="artistData.name !== 'Various Artists'" @click="getIpduckList"
          class="btn btn-danger text-center">누르면 입덕 영상</button>
        </div>
        <!-- 16:9 aspect ratio -->
        <div v-if="youtubeUrl" class="embed-responsive embed-responsive-16by9">
          <iframe class="embed-responsive-item" :src="youtubeUrl"></iframe>
        </div>

        <p v-if="isClick" class="card-text"><span class="text-muted">IpDuck List</span></p>
        <div class="row justify-content-center">
          <div v-for="ipduck in ipduck_list" :key="ipduck.etag"
            class="col-3 no-gutters p-0 m-1">
            <img :src="ipduck.snippet.thumbnails.default.url" class="card-img">
            <div class="card-img-overlay music-title d-flex align-items-center" @click="showPlayer(ipduck.id.videoId)">
              <p class="card-title video-text">{{ ipduck.snippet.channelTitle }}</p>
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

const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY
const API_URL = 'https://www.googleapis.com/youtube/v3/search'
const REQ_URL = process.env.VUE_APP_REQ_URL

export default {
  name: 'ArtistDetailPage',
  data() {
    return {
      artistData: {},
      ipduck_list: [],
      youtubeUrl: "",
      isClick: false,
    }
  },
  methods: {
    getArtistData() {
      axios.get(`${REQ_URL}/${this.$route.params.id}`)
        .then(response => {
          // console.log(response.data)
          // console.log(process.env)
          this.artistData = response.data
        })
    }, 
    getIpduckList() {
      const KOREAN = /[ㄱ-ㅎ|ㅏ-ㅑ|가-힣]/;
      // console.log(KOREAN.test(this.artistData.name))
      const isKorean = KOREAN.test(this.artistData.name)
      const query = isKorean ? `${this.artistData.name} 입덕` : `${this.artistData.name}`
      const order = isKorean ? 'rating' : 'viewCount'

      axios.get(API_URL, {
        params: {
          key: API_KEY,
          type: 'video',
          order: order,
          part: 'snippet',
          q: query
        }
      })
        .then( response => {
          console.log(response.data.items)
          this.ipduck_list = response.data.items
          this.isClick = true
        })
    },
    goSongInfo(id) {
      console.log(id)
      router.push(`/music/${id}`)
    },
    showPlayer(videoId) {
      this.youtubeUrl = `https://www.youtube.com/embed/${videoId}`
    }

  }, // methods 
  created() {
    this.getArtistData()
  }
}
</script>

<style scope>
.card {
  max-width: 80vh;
  min-width: 30vh;
}
.music-text {
  font-size: 0.75rem;
  font-weight: bold;
}

.music-title {
  color: rgba( 255, 255, 255, 0.0 );
}

.music-title:hover {
  color: black;
  background-color: rgba( 255, 255, 255, 0.8 );
  cursor: pointer;
}

.video-text {
  font-size: 0.85rem;
  font-weight: bold;
}
</style>
