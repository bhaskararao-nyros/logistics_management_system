<template>
  <div class="dashboard">
    <!-- NOTIFICATIONS COMPONENT -->
    <notifications group="user_notifications" />
    <b-row class="dashboard_row">
      <b-col cols="3">
        <!-- SIDEBAR COMPONENT -->
        <Sidebar />
      </b-col>
      <b-col cols="9">
        <!-- NAVBAR COMPONENT -->
        <Navbar />
        <!-- BREADCRUBM FOR EASY NAVIGATION -->
        <b-breadcrumb :items="breadcrumb_items"/>
        <!-- ADD FORM -->
        <b-card class="add_product_card">
        <div v-if="add_err" class="text-center">
          <p class="text-danger">* {{ err_msg }}</p>
        </div>
          <b-form @submit.prevent="add">
            <b-row class="form_row_margin">
              <b-col>
                <b-row>
                  <b-col cols="3">
                    <label>User name</label>  
                  </b-col>
                  <b-col>
                    <b-form-input 
                      v-model="user.name"
                      type="text"
                      placeholder="Enter user name"
                      class="form_input">
                    </b-form-input>
                  </b-col>
                </b-row>
              </b-col>
              <b-col>
                <b-row>
                  <b-col cols="3">
                    <label>Address</label>  
                  </b-col>
                  <b-col>
                    <b-form-input 
                      v-model="user.address"
                      type="text"
                      placeholder="Enter user address"
                      class="form_input">
                    </b-form-input>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row class="form_row_margin">
              <b-col>
                <b-row>
                  <b-col cols="3">
                    <label>Select role</label>  
                  </b-col>
                  <b-col>
                    <select v-model="user.role_as" class="form-control">
                      <option value="select">Select</option>
                      <option value="operator">Operator</option>
                      <option value="admin">Admin</option>
                    </select>
                  </b-col>
                </b-row>
              </b-col>
              <b-col>
                
              </b-col>
            </b-row>
            <b-button type="submit" class="add_product_btn" size="sm">Add</b-button>
          </b-form>
        </b-card>
        <b-card class="display_products_card">
          <b-container fluid>
            <b-row>
              <!-- SEARCH FILTER -->
              <b-col md="4" class="my-1">
                <b-input-group>
                  <b-form-input v-model="filter" placeholder="Type to Search" />
                  <b-input-group-append>
                    <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
                  </b-input-group-append>
                </b-input-group>
              </b-col>
              <b-col md="6" class="my-1"></b-col>
              <!-- SORT FILTER -->
              <b-col md="2" class="my-1">
                <b-form-group horizontal class="mb-0">
                  <b-form-select :options="pageOptions" v-model="perPage" />
                </b-form-group>
              </b-col>
            </b-row>
            <!-- TABLE -->
            <b-table show-empty 
              responsive
              :items="users"
              :fields="fields"
              :current-page="currentPage"
              :per-page="perPage"
              :filter="filter"
              @filtered="onFiltered"
              class="users_table">
              <template slot="role_as" slot-scope="row">{{ row.value === 'operator' ? "Operator" : "Admin" }}</template>
              <template slot="status" slot-scope="row">
                <p class="text-danger" v-if="row.value === 0">Deactive</p>
                <p class="text-success" v-else>Active</p>
              </template>
              <template slot="actions" slot-scope="row">
                <b-button size="sm" variant="info" @click.stop="edit(row.item, row.index, $event.target)" class="mr-1">
                  Edit
                </b-button>
                <b-button size="sm" v-if="row.item.status === 0" variant="warning" @click.stop="activateUser(row.item.id)" class="mr-1">
                  Activate
                </b-button>
                <b-button size="sm" v-else variant="danger" @click.stop="deactivateUser(row.item.id)" class="mr-1">
                  Deactivate
                </b-button>
              </template>
            </b-table>
            <!-- TABLE PAGINATION -->
            <b-row class="pagination_row">
              <b-col md="6" class="my-1">
                <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
              </b-col>
            </b-row>

            <!-- EDIT MODAL -->
            <b-modal class="edit_modal" size="lg" id="editModal" title="Edit">
              <div v-if="edit_err" class="text-center">
                <p class="text-danger">* {{ err_msg }}</p>
              </div>
              <b-form>
                <b-row class="form_row_margin">
                  <b-col>
                    <b-row>
                      <b-col cols="3">
                        <label>User name</label>  
                      </b-col>
                      <b-col>
                        <b-form-input 
                          v-model="editModalInfo.name"
                          type="text"
                          placeholder="Enter user name"
                          class="form_input">
                        </b-form-input>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col>
                    <b-row>
                      <b-col cols="3">
                        <label>Address</label>  
                      </b-col>
                      <b-col>
                        <b-form-input 
                          v-model="editModalInfo.address"
                          type="text"
                          placeholder="Enter address"
                          class="form_input">
                        </b-form-input>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row class="form_row_margin">
                  <b-col>
                    <b-row>
                      <b-col cols="3">
                        <label>Select role</label>  
                      </b-col>
                      <b-col>
                        <select v-model="editModalInfo.role_as" class="form-control">
                          <option value="select">Select</option>
                          <option value="operator">Operator</option>
                          <option value="admin">Admin</option>
                        </select>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col>
                    
                  </b-col>
                </b-row>
              </b-form>
              <div slot="modal-footer" class="w-100">
                <b-btn size="sm" class="float-right" variant="primary" @click="update">
                   Update
                </b-btn>
              </div>
            </b-modal>

            <!-- DELETE MODAL -->
            <b-modal header-bg-variant="danger" id="deleteModal" title="Delete">
              <p>Are you sure want to delete this user ?</p>
              <div slot="modal-footer" class="w-100">
                <b-btn size="md" class="modal_btns" variant="secondary" @click="deleteItem">
                   Yes
                </b-btn>
                <b-btn size="md" class="modal_btns" variant="primary" @click="closeDeleteModal">
                   No
                </b-btn>
              </div>
            </b-modal>
          </b-container>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import Sidebar from './../Sidebar'; 
import Navbar from './../Navbar';

let users = []

export default {
  name: 'Users',
  data () {
    return {
      breadcrumb_items: [
        { text: 'Dashboard', href: '/' }, 
        { text: 'Users', active: true }
      ],
      fields: [
        { key: 'name', label: 'User name', sortable: true },
        { key: 'address', label: 'Address', sortable: true },
        { key: 'role_as', label: 'Role as', sortable: true },
        { key: 'status', label: 'Status', sortable: true },
        { key: 'actions', label: 'Actions' }
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: users.length,
      pageOptions: [ 5, 10, 15 ],
      filter: null,
      editModalInfo: { name: '', id: 0, role_as: 'select' },
      err_msg: '',
      add_err: false,
      edit_err: false,
      delete_id: 0,
      user: { 
        name: '', 
        address: '', 
        role_as: 'select', 
        status: ''
      }
    }
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    getUsers () {
      this.$store.dispatch('GET_USERS')
    },

    // CALLING NOTIFICATIONS AFTER EACH OPERATION
    callNotification (type,msg) {
      this.$notify({
        group: 'user_notifications',
        type: 'warn',
        title: type,
        text: msg
      });
    },

    // OPEN AND CLOSE MODALS
    closeDeleteModal () {
      this.$root.$emit('bv::hide::modal', 'deleteModal')
    },
    openDeleteModal (item, index, button) {
      this.delete_id = item.id
      this.$root.$emit('bv::show::modal', 'deleteModal', button)
    },

    // SEARCH FILTER
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },

    // CRUD METHODS
    add () {
      if (this.user.name === '') {
        this.add_err = true
        this.err_msg = 'User name required'
      } else if (this.user.address === '') {
        this.add_err = true
        this.err_msg = "User address required"
      } else if (this.user.role_as === 'select') {
        this.add_err = true
        this.err_msg = "User role required"
      } else {
        this.add_err = false
        this.err_msg = ''
      }

      if (!this.add_err) {
        this.$store.dispatch('ADD_USER', this.user)
        this.callNotification('ADD USER','User added successfully')
        // this.user.name = ''
        // this.user.address = ''
        // this.user.source = ''
        // this.user.destination = ''
        // this.user.quantity = ''
        // this.user.rate = ''
        // this.user.short_code = ''
      }
    },
    edit (item, index, button) {
      this.editModalInfo.id = item.id
      this.editModalInfo.name = item.name
      this.editModalInfo.address = item.address
      this.editModalInfo.role_as = item.role_as
      this.$root.$emit('bv::show::modal', 'editModal', button)
    },
    update () {
      if (this.editModalInfo.name === '') {
        this.edit_err = true
        this.err_msg = 'User name required'
      } else if (this.editModalInfo.address === '') {
        this.edit_err = true
        this.err_msg = "User address required"
      } else if (this.editModalInfo.role_as === 'select') {
        this.edit_err = true
        this.err_msg = "User role required"
      } else {
        this.edit_err = false
        this.err_msg = ''
      }

      if (!this.edit_err) {
        this.$root.$emit('bv::hide::modal', 'editModal')
        this.$store.dispatch('UPDATE_USER',this.editModalInfo)
        this.getUsers()
        this.callNotification('UPDATE USER','User updated successfully')
      }
    },
    activateUser (id) {
      let data = { id: id, status: 1 }
      this.$store.dispatch('ACTIVATE_USER',data)
      this.getUsers()
      this.callNotification('ACTIVATE USER','User activated successfully')
    },
    deactivateUser (id) {
      let data = { id: id, status: 0 }
      this.$store.dispatch('DEACTIVATE_USER',data)
      this.getUsers()
      this.callNotification('DEACTIVATE USER','User Deactivated successfully')
    },
  },
  computed: {

    // GETTING PRODUCTS FROM VUEX STORE
    users () {
      users = this.$store.getters.USERS
      return this.$store.getters.USERS
    }
  },
  components: {
    Navbar,
    Sidebar
  }
}
</script>

<style>
.col-9, .col-3 {
  padding: 0px !important;
}
.dashboard_row {
  margin: 0px;
}
.add_product_card .card-body {
  padding: 2%;  
}
.add_product_card, .breadcrumb, .display_products_card {
  border-radius: 0px;
}
.add_product_btn {
  float: right;
}
.pagination_row {
  float: right;
}
/*.form_input {
  width: 50%;
}*/
.modal_btns {
  float: right;
  margin-left: 1%;
}
label {
  margin-top: 6%;
}
.form_row_margin {
  margin-top: 2px;
  margin-left: 1%;
}
.users_table th.sorting {
  width: 20% !important;
}
</style>