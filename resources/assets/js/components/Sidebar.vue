<template>
	<div class="sidebar">
    <ul class="sidebar_ul">
      <router-link to="/"><li id="app_name">LMS v1.0</li></router-link>
      <router-link to="/lr_entry"><li :class="{ main_li_active : pathname === '/lr_entry' }">LR Entry <font-awesome-icon icon="caret-right" class="fa_icon" /></li></router-link>
      <li>Bills <font-awesome-icon icon="caret-right" class="fa_icon" /></li>
      <li>Bank Statements <font-awesome-icon icon="caret-right" class="fa_icon" /></li>
      <li id="data_management_li" @click="sidebarToggle">Data Management <font-awesome-icon icon="caret-right" class="fa_icon" v-if="!data_management" />
      <font-awesome-icon icon="caret-down" class="fa_icon" v-if="data_management" />
      </li>
      <ul id="nested_ul_id" class="nested_ul" v-if="data_management">
        <router-link :to="'/' + list.link" v-for="list in nested_li_items" :key="list.name">
          <li :class="{ nested_li_active : list.name === active_nested_li }">{{ list.label }} 
            <font-awesome-icon icon="caret-right" class="fa_icon" />
          </li>
        </router-link>
      </ul>
    </ul>
	</div>
</template>

<script>

export default {
  name: 'Sidebar',
  data () {
    return {
      active_nested_li : 'none',
    	nested_li_items : [ 
        { name: 'products', label: 'Products', link: 'product' },
        { name: 'tankers', label: 'Tankers', link: 'tanker' },
        { name: 'fright', label: 'Fright', link: 'fright' },
        { name: 'users', label: 'Users', link: 'user' },
        { name: 'company', label: 'Company', link: 'company' },
        { name: 'vendors', label: 'Vendors', link: 'vendor' },
      ],
      pathname : window.location.pathname
    }
  },
  mounted () {
    let pathname = window.location.pathname
    for (var i = 0; i < this.nested_li_items.length; i++) {
      if ('/'+this.nested_li_items[i].link === pathname) {
        this.$store.dispatch('MODIFY_SIDEBAR', true)
        this.active_nested_li = this.nested_li_items[i].name
      }
    }
  },
  methods: {
    sidebarToggle () {
      this.$store.dispatch('MODIFY_SIDEBAR')
    }
  },
  computed: {
  	data_management () {
	    return this.$store.getters.SIDEBAR
	  },
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
.sidebar_ul a {
  outline: none !important;
  text-decoration: none;
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
#nested_ul_id a {
  color: #fff !important;
  text-decoration: none;
  outline: none !important;
}
#app_name a {
  color: #fff;
  text-decoration: none;
}
.fa_delete_icon {
  color: #dc3545;
  font-size: 21px;
  height: 26px;
  cursor: pointer;
}
.fa_edit_icon {
  color: #17a2b8;
  font-size: 25px;
  cursor: pointer;
}
.form_input {
  width: 100%;
}
.form_row_margin {
  margin-top: 3px;
  margin-left: 1%;
}
.content_column {
  max-width: 80%;
  flex: 0 0 80%;
}
.sidebar_column {
  max-width: 20%;
  flex: 0 0 20%;
}
.nested_li_active, .main_li_active {
  background-color: #518c95 !important;
  font-weight: bold;
}
</style>