<template>
	<div class="sidebar">
    <ul class="sidebar_ul">
      <li id="app_name">LMS 1.0</li>
      <li>LR Entry <font-awesome-icon icon="caret-right" class="fa_icon" /></li>
      <li>Bills <font-awesome-icon icon="caret-right" class="fa_icon" /></li>
      <li>Bank Statements <font-awesome-icon icon="caret-right" class="fa_icon" /></li>
      <li id="data_management_li" @click="data_management = !data_management">Data Management <font-awesome-icon icon="caret-right" class="fa_icon" v-if="!data_management" />
      <font-awesome-icon icon="caret-down" class="fa_icon" v-if="data_management" />
      </li>
      <ul class="nested_ul" v-if="data_management">
        <li><router-link to="/products">Products <font-awesome-icon icon="caret-right" class="fa_icon" /></router-link></li>
        <li><router-link to="/companies">Firm/Company <font-awesome-icon icon="caret-right" class="fa_icon" /></router-link></li>
        <li>Tankers <font-awesome-icon icon="caret-right" class="fa_icon" /></li>
        <li>Fright <font-awesome-icon icon="caret-right" class="fa_icon" /></li>
        <li>Users <font-awesome-icon icon="caret-right" class="fa_icon" /></li>
      </ul>
    </ul>
	</div>
</template>

<script>

export default {
  name: 'Sidebar',
  data () {
    return {
    	data_management: false
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

<style>
.navbar_blk .bg-info {
  background-color: #457981 !important;
}
.sidebar_ul {
  list-style: none;
  min-height: 800px;
  background-color: #457981;
}
.sidebar_ul li {
  background-color: #457981;
  padding: 16px;
  border-top: 1px solid #679299;;
  margin-left: -40px;
  color: #fff;
  cursor: pointer;
}
.nested_ul li {
  margin-left: -80px;
  padding-left: 20%;
}
.nested_ul li:last-child {
  border-bottom: 1px solid #679299;;
}
.nested_ul {
  list-style: none;
}
#data_management_li {
  border-bottom: 1px solid #679299;;
}
#app_name {
  background-color: #2e4245;
  color: #fff;
  border: none;
  font-weight: bold;
}
.fa_icon {
  float: right;
  font-size: 23px;
}
</style>