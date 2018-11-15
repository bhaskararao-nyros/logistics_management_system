<template>
	<div class="navbar_blk">
    <b-navbar class="navbar_class" toggleable="md" type="dark" variant="info">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#">Dashboard</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <span>Admin</span>
            </template>
            <b-dropdown-item href="#">Add user</b-dropdown-item>
            <b-dropdown-item href="#">Roles management</b-dropdown-item>
            <b-dropdown-item href="#">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
	</div>
</template>

<script>

export default {
  name: 'Navbar',
  data () {
    return {
    	
    }
  },
  methods: {
  	// addCat () {
  	// 	this.cat_id += 1
  	// 	let obj = { id: this.cat_id, name: this.cat_input }
  	// 	this.$store.dispatch('SAVE_CAT', obj)
  	// 	this.cat_input = ''
  	// },
  	// removeCat (cat_id) {
  	// 	this.$store.dispatch('DEL_CAT',cat_id)
  	// },


  	// addSubCat (cat_id) {
  	// 	this.sub_cat_id += 1
  	// 	let obj = { id: this.cat_id, c_id: cat_id, name: this.sub_cat_input }
  	// 	this.$store.dispatch('SAVE_SUB_CAT', obj)
  	// 	this.sub_cat_input = ''
  	// },
  	// removeCat (cat_id) {
  	// 	this.$store.dispatch('DEL_SUB_CAT',cat_id)
  	// }
  },
  computed: {
 //  	catList(){
	//     return this.$store.getters.CATEGORIES
	// },
	// subCatList(){
	//     return this.$store.getters.SUB_CATEGORIES
	// }
  }
}
</script>

<style scoped>
</style>