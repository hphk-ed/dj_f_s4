<template>
  <div class="container justify-content-center">
    <div v-if="music" class="row flex-column align-items-center">
      <h2 class="text-center mt-5">{{ music.name }}</h2>
      <h3 class="text-center mb-3"><span class="badge badge-dark oduck">{{ music.artists[0].name }}</span></h3>
      <img class="detail-image" :src="music.album.image" :alt="music.album.title + ' 앨범 커버 사진'">
      <div>
        <p>
          <span class="font-weight-bold">{{ 
            music.fake_like > 10000 ? '수만 명' : 
            music.fake_like > 1000 ? '수천 명' : 
            music.fake_like > 10 ? '수십 명' : '여러 명'  
          }}</span>이 좋아합니다.
        </p>    
      </div>
      <div v-if="music.lyrics" class="lyrics-box mb-5">
        <pre class="detail-lyrics my-4">{{ music.lyrics }}</pre>
        <span class="badge badge-pill badge-secondary thebogi" @click="moreLyrics">더보기</span>
      </div>
    </div>
    <div v-else>
      <h2 class="text-center mt-5">곡정보가 없습니다 ㅠㅠ</h2>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name:'MusicDetailPage',
  data() {
    return {
      music: null
    }
  },
  methods: {
    getMusic() {
      axios.get(`http://127.0.0.1:8000/api/music/${this.$route.params.id}/`)
        .then(response => {
          this.music = response.data
        })
    },
    moreLyrics(event) {
      event.target.innerText = event.target.parentNode.childNodes[0].classList.toggle('detail-lyrics') ? '더보기' : '줄이기'
    }
  },
  mounted() {
    
  },
  created() {
    this.getMusic()
  }
}
</script>

<style scoped>
.detail-image {
  width: 40vw;
}

.detail-lyrics {
  -webkit-line-clamp: 15;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.lyrics-box {
  position: relative;
  width: 40vw;
}

.thebogi {
  position: absolute;
  bottom: 0px;
  left: 0px;
}

.thebogi:hover {
  cursor: pointer;
}
</style>