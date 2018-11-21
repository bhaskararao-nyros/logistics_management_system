<template>
  <div class="dashboard">
    <!-- NOTIFICATIONS COMPONENT -->
    <notifications group="vendor_notifications" />
    <b-row class="dashboard_row">
      <b-col cols="3" class="sidebar_column">
        <!-- SIDEBAR COMPONENT -->
        <Sidebar />
      </b-col>
      <b-col cols="9" class="content_column">
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
                    <label>Vendor Name</label>  
                  </b-col>
                  <b-col>
                    <b-form-input 
                      v-model="vendor.name"
                      type="text"
                      placeholder="Enter vendor name"
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
                      v-model="vendor.address"
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
                    <label>Margin Loss</label>  
                  </b-col>
                  <b-col>
                    <b-form-input 
                      v-model="vendor.margin_loss"
                      type="text"
                      placeholder="Enter margin loss"
                      class="form_input">
                    </b-form-input>
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
              :items="vendors"
              :fields="fields"
              :current-page="currentPage"
              :per-page="perPage"
              :filter="filter"
              @filtered="onFiltered"
              class="table_class">
              <template slot="serial_no" slot-scope="row">{{ row.index + 1 }}</template>
              <template slot="name" slot-scope="row">{{ row.value }}</template>
              <template slot="actions" slot-scope="row">
                <font-awesome-icon icon="pen-square" @click.stop="edit(row.item, row.index, $event.target)" class="fa_edit_icon" />
                <font-awesome-icon icon="trash" @click.stop="openDeleteModal(row.item, row.index, $event.target)" class="fa_delete_icon" />
              </template>
              <template slot="row-details" slot-scope="row">
                <b-card>
                  <ul>
                    <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value}}</li>
                  </ul>
                </b-card>
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
                        <label>Vendor Name</label>  
                      </b-col>
                      <b-col>
                        <b-form-input 
                          v-model="editModalInfo.name"
                          type="text"
                          placeholder="Enter vendor name"
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
                        <label>Margin Loss</label>  
                      </b-col>
                      <b-col>
                        <b-form-input 
                          v-model="editModalInfo.margin_loss"
                          type="text"
                          placeholder="Enter short code"
                          class="form_input">
                        </b-form-input>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col>
                    <!-- empty col -->
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
              <p>Are you sure want to delete this vendor ?</p>
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

let vendors = []

export default {
  name: 'Vendors',
  data () {
    return {
      breadcrumb_items: [
        { text: 'Dashboard', href: '/' }, 
        { text: 'Vendors', active: true }
      ],
      fields: [
        { key: 'serial_no', label: 'S.No', sortable: true },
        { key: 'name', label: 'Vendor Name', sortable: true },
        { key: 'address', label: 'Address', sortable: true },
        { key: 'margin_loss', label: 'Margin Loss', sortable: true },
        { key: 'actions', label: 'Actions' }
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: vendors.length,
      pageOptions: [ 5, 10, 15 ],
      filter: null,
      editModalInfo: { name: '', id: 0 },
      err_msg: '',
      add_err: false,
      edit_err: false,
      delete_id: 0,
      vendor: { 
        name: '', 
        address: '',
        margin_loss: ''}
    }
  },
  mounted () {
    document.title = "Vendors - LMS"
    this.getVendors()
  },
  methods: {
    getVendors () {
      this.$store.dispatch('GET_VENDORS')
    },

    // CALLING NOTIFICATIONS AFTER EACH OPERATION
    callNotification (type,msg) {
      this.$notify({
        group: 'vendor_notifications',
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
      if (this.vendor.name === '') {
        this.add_err = true
        this.err_msg = 'Vendor name required'
      } else if (this.vendor.name.length < 3) {
        this.add_err = true
        this.err_msg = 'Vendor name must be atleast 3 characters'
      } else if (this.vendor.address === '') {
        this.add_err = true
        this.err_msg = "Address required"
      } else if (this.vendor.margin_loss === '') {
        this.add_err = true
        this.err_msg = "Margin Loss required"
      } else {
        this.add_err = false
        this.err_msg = ''
      }

      if (!this.add_err) {
        this.$store.dispatch('ADD_VENDOR', this.vendor)
        this.getVendors()
        this.callNotification('ADD VENDOR','Vendor added successfully')
        // this.vendor.name = ''
        // this.vendor.address = ''
        // this.vendor.source = ''
        // this.vendor.destination = ''
        // this.vendor.quantity = ''
        // this.vendor.rate = ''
        // this.vendor.short_code = ''
      }
    },
    edit (item, index, button) {
      this.editModalInfo.id = item.id
      this.editModalInfo.name = item.name
      this.editModalInfo.address = item.address
      this.editModalInfo.margin_loss = item.margin_loss
      this.$root.$emit('bv::show::modal', 'editModal', button)

    },
    update () {

      if (this.editModalInfo.name === '') {
        this.edit_err = true
        this.err_msg = 'vendor name required'
      } else if (this.editModalInfo.name.length < 3) {
        this.edit_err = true
        this.err_msg = 'vendor name must be atleast 3 characters'
      } else if (this.editModalInfo.address === '') {
        this.edit_err = true
        this.err_msg = "Address required"
      } else if (this.editModalInfo.margin_loss === '') {
        this.edit_err = true
        this.err_msg = "Short code required"
      } else {
        this.edit_err = false
        this.err_msg = ''
      }

      if (!this.edit_err) {
        this.$root.$emit('bv::hide::modal', 'editModal')
        this.$store.dispatch('UPDATE_VENDOR',this.editModalInfo)
        this.getVendors()
        this.callNotification('UPDATE VENDOR','Vendor updated successfully')
      }
    },
    deleteItem () {
      let data = { id: this.delete_id }
      this.$store.dispatch('DELETE_VENDOR',data)
      this.closeDeleteModal()
      this.getVendors()
      this.callNotification('DELETE VENDOR','Vendor deleted successfully')
    },
  },
  computed: {

    // GETTING PRODUCTS FROM VUEX STORE
    vendors () {
      vendors = this.$store.getters.VENDORS
      return this.$store.getters.VENDORS
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
.modal_btns {
  float: right;
  margin-left: 1%;
}
label {
  margin-top: 6%;
}
.table_class th.sorting {
  width: 22% !important;
}

</style>