<template>
  <div />
</template>

<script>
export default {
  async fetch({ store, app, redirect }) {
    redirect(`/pins${store.state.pinsPat}`)
  }  
}
</script>
