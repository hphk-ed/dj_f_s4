<template>
  <div>
    <div class="container">
      <TagList />
      <HashTagList />
    </div>
  </div>
</template>

<script>
import TagList from '@/components/TagList'
import HashTagList from '@/components/HashTagList'

export default {
  name: 'MainPage',
  components: {
    TagList,
    HashTagList,
  }
}
</script>

<style>
</style>
