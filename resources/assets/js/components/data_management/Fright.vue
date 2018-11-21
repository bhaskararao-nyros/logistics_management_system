<template>
  <div class="dashboard">
    <!-- NOTIFICATIONS COMPONENT -->
    <notifications group="fright_notifications" />
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
                    <label>Product</label>  
                  </b-col>
                  <b-col>
                    <select v-model="fright.product" class="form-control">
                      <option value="select">Select</option>
                      <option v-for="product in products">{{ product.name }}</option>
                    </select>
                  </b-col>
                </b-row>
              </b-col>
              <b-col>
                <b-row>
                  <b-col cols="3">
                    <label>Quantity</label>  
                  </b-col>
                  <b-col>
                    <select v-model="fright.quantity" class="form-control">
                      <option value="select">Select</option>
                      <option value="10">10 Tonne</option>
                      <option value="20">20 Tonne</option>
                      <option value="30">30 Tonne</option>
                      <option value="40">40 Tonne</option>
                    </select>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row class="form_row_margin">
              <b-col>
                <b-row>
                  <b-col cols="3">
                    <label>Rate</label>  
                  </b-col>
                  <b-col>
                    <b-form-input 
                      v-model="fright.rate"
                      type="text"
                      placeholder="Enter rate per quantity"
                      class="form_input">
                    </b-form-input>
                  </b-col>
                </b-row>
              </b-col>
              <b-col>
                <b-row>
                  <b-col cols="3">
                    <label>Source</label>  
                  </b-col>
                  <b-col>
                    <b-form-input 
                      v-model="fright.source"
                      type="text"
                      placeholder="Enter source"
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
                    <label>Destination</label>  
                  </b-col>
                  <b-col>
                    <b-form-input 
                      v-model="fright.destination"
                      type="text"
                      placeholder="Enter destination"
                      class="form_input">
                    </b-form-input>
                  </b-col>
                </b-row>
              </b-col>
              <b-col>
                <b-row>
                  <b-col cols="3">
                    <label>Distance</label>  
                  </b-col>
                  <b-col>
                    <b-form-input 
                      v-model="fright.distance"
                      type="text"
                      placeholder="Enter distance"
                      class="form_input">
                    </b-form-input>
                  </b-col>
                </b-row>
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
              :items="frights"
              :fields="fields"
              :current-page="currentPage"
              :per-page="perPage"
              :filter="filter"
              @filtered="onFiltered"
              class="fright_table">
              <template slot="serial_no" slot-scope="row">{{ row.index + 1 }}</template>
              <template slot="name" slot-scope="row">{{ row.value }}</template>
              <template slot="quantity" slot-scope="row">{{ row.value }} tonnes</template>
              <template slot="distance" slot-scope="row">{{ row.value }} km</template>
              <template slot="actions" slot-scope="row">
                <font-awesome-icon icon="pen-square" @click.stop="edit(row.item, row.index, $event.target)" class="fa_edit_icon" />
                <font-awesome-icon icon="trash" @click.stop="openDeleteModal(row.item, row.index, $event.target)" class="fa_delete_icon" />
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
                        <label>Product</label>  
                      </b-col>
                      <b-col>
                        <select v-model="editModalInfo.product" class="form-control">
                          <option value="select">Select</option>
                          <option v-for="product in products" :value="product.name">{{ product.name }}</option>
                        </select>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col>
                    <b-row>
                      <b-col cols="3">
                        <label>Owner</label>  
                      </b-col>
                      <b-col>
                        <select v-model="editModalInfo.quantity" class="form-control">
                          <option value="select">Select</option>
                          <option value="10">10 Tonne</option>
                          <option value="20">20 Tonne</option>
                          <option value="30">30 Tonne</option>
                          <option value="40">40 Tonne</option>
                        </select>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row class="form_row_margin">
                  <b-col>
                    <b-row>
                      <b-col cols="3">
                        <label>Source</label>  
                      </b-col>
                      <b-col>
                        <b-form-input 
                          v-model="editModalInfo.source"
                          type="text"
                          placeholder="Enter source"
                          class="form_input">
                        </b-form-input>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col>
                    <b-row>
                      <b-col cols="3">
                        <label>Destination</label>  
                      </b-col>
                      <b-col>
                        <b-form-input 
                          v-model="editModalInfo.destination"
                          type="text"
                          placeholder="Enter destination"
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
                        <label>Fright</label>  
                      </b-col>
                      <b-col>
                        <b-form-input 
                          v-model="editModalInfo.rate"
                          type="text"
                          placeholder="Enter fright"
                          class="form_input">
                        </b-form-input>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col>
                    <b-row>
                      <b-col cols="3">
                        <label>Distance</label>  
                      </b-col>
                      <b-col>
                        <b-form-input 
                          v-model="editModalInfo.distance"
                          type="text"
                          placeholder="Enter distance"
                          class="form_input">
                        </b-form-input>
                      </b-col>
                    </b-row>
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
              <p>Are you sure want to delete this fright ?</p>
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

let frights = []

export default {
  name: 'Fright',
  data () {
    return {
      breadcrumb_items: [
        { text: 'Dashboard', href: '/' }, 
        { text: 'Fright', active: true }
      ],
      fields: [
        { key: 'serial_no', label: 'S.No', sortable: true },
        { key: 'product', label: 'Product', sortable: true },
        { key: 'quantity', label: 'Quantity', sortable: true },
        { key: 'rate', label: 'Rate', sortable: true },
        { key: 'source', label: 'Source', sortable: true },
        { key: 'destination', label: 'Destination', sortable: true },
        { key: 'distance', label: 'Distance', sortable: true },
        { key: 'actions', label: 'Actions' }
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: frights.length,
      pageOptions: [ 5, 10, 15 ],
      filter: null,
      editModalInfo: { product: 'select', quantity: 'select', id: 0 },
      err_msg: '',
      add_err: false,
      edit_err: false,
      delete_id: 0,
      fright: { 
        product: 'select', 
        quantity: 'select', 
        source: '', 
        destination: '', 
        rate: '', 
        distance: ''
      }
    }
  },
  mounted () {
    document.title = "Fright - LMS"
    this.getFright()
  },
  methods: {
    getFright () {
      this.$store.dispatch('GET_FRIGHTS')
    },

    // CALLING NOTIFICATIONS AFTER EACH OPERATION
    callNotification (type,msg) {
      this.$notify({
        group: 'fright_notifications',
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
      if (this.fright.product === 'select') {
        this.add_err = true
        this.err_msg = 'Please select product'
      } else if (this.fright.quantity === 'select') {
        this.add_err = true
        this.err_msg = "Please select quantity"
      } else if (this.fright.source === '') {
        this.add_err = true
        this.err_msg = "Source required"
      } else if (this.fright.destination === '') {
        this.add_err = true
        this.err_msg = "Destination required"
      } else if (this.fright.rate === '') {
        this.add_err = true
        this.err_msg = "Rate required"
      } else if (this.fright.distance === '') {
        this.add_err = true
        this.err_msg = "Distance required"
      } else {
        this.add_err = false
        this.err_msg = ''
      }

      if (!this.add_err) {
        this.$store.dispatch('ADD_FRIGHT', this.fright)
        this.callNotification('ADD fright','fright added successfully')
        // this.fright.name = ''
        // this.fright.address = ''
        // this.fright.source = ''
        // this.fright.destination = ''
        // this.fright.quantity = ''
        // this.fright.rate = ''
        // this.fright.short_code = ''
      }
    },
    edit (item, index, button) {
      this.editModalInfo.id = item.id
      this.editModalInfo.product = item.product
      this.editModalInfo.quantity = item.quantity
      this.editModalInfo.source = item.source
      this.editModalInfo.destination = item.destination
      this.editModalInfo.rate = item.rate
      this.editModalInfo.distance = item.distance
      this.$root.$emit('bv::show::modal', 'editModal', button)
    },
    update () {

      if (this.editModalInfo.product === 'select') {
        this.edit_err = true
        this.err_msg = 'Please select product'
      } else if (this.editModalInfo.quantity === 'select') {
        this.edit_err = true
        this.err_msg = "Please select quantity"
      } else if (this.editModalInfo.source === '') {
        this.edit_err = true
        this.err_msg = "Source required"
      } else if (this.editModalInfo.destination === '') {
        this.edit_err = true
        this.err_msg = "Destination required"
      } else if (this.editModalInfo.rate === '') {
        this.edit_err = true
        this.err_msg = "Rate required"
      } else if (this.editModalInfo.distance === '') {
        this.edit_err = true
        this.err_msg = "Distance required"
      } else {
        this.edit_err = false
        this.err_msg = ''
      }

      if (!this.edit_err) {
        this.$root.$emit('bv::hide::modal', 'editModal')
        this.$store.dispatch('UPDATE_FRIGHT',this.editModalInfo)
        this.getFright()
        this.callNotification('UPDATE FRIGHT','Fright updated successfully')
      }
    },
    deleteItem () {
      let data = { id: this.delete_id }
      this.$store.dispatch('DELETE_FRIGHT',data)
      this.closeDeleteModal()
      this.getFright()
      this.callNotification('DELETE FRIGHT','Fright deleted successfully')
    },
  },
  computed: {

    // GETTING PRODUCTS FROM VUEX STORE
    frights () {
      frights = this.$store.getters.FRIGHTS
      return this.$store.getters.FRIGHTS
    },
    products () {
      return this.$store.getters.PRODUCTS
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
.fright_table th.sorting {
  width: 14% !important;
}
.add_product_btn {
  margin-top: 1%;
}
</style>