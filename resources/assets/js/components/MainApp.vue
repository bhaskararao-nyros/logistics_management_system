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
      this.$store.dispatch('GET_VENDORS')
      this.$store.dispatch('GET_TANKERS')
 	}
 }
</script>