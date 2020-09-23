<template>
  <div />
</template>

<script>
export default {
  async fetch({ store, redirect }) {
    redirect(`/pins${store.state.pinsPath}`)
  }
}
</script>
