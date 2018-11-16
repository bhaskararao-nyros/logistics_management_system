<template>
 <div>
 <transition name="fade">
 <router-view></router-view>
 </transition>
 </div>
</template>

<script>
export default {
 	mounted () {
      this.$store.dispatch('GET_PRODUCTS')
 	}
 }
</script>