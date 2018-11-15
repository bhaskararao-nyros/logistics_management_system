<template>
  <div class="dashboard">
    <!-- NOTIFICATIONS COMPONENT -->
    <notifications group="company_notifications" />
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
          <b-form @submit.prevent="addCompany">
            <b-row class="form_row_margin">
              <b-col>
                <b-row>
                  <b-col cols="3">
                    <label>Company Name</label>  
                  </b-col>
                  <b-col>
                    <b-form-input 
                      v-model="company.name"
                      type="text"
                      placeholder="Enter company name"
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
                      v-model="company.address"
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
                    <label>Source</label>  
                  </b-col>
                  <b-col>
                    <b-form-input 
                      v-model="company.source"
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
                      v-model="company.destination"
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
                    <label>Quantity</label>  
                  </b-col>
                  <b-col>
                    <b-form-input 
                      v-model="company.quantity"
                      type="text"
                      placeholder="Enter quantity"
                      class="form_input">
                    </b-form-input>
                  </b-col>
                </b-row>
              </b-col>
              <b-col>
                <b-row>
                  <b-col cols="3">
                    <label>Rate</label>  
                  </b-col>
                  <b-col>
                    <b-form-input 
                      v-model="company.rate"
                      type="text"
                      placeholder="Enter product name"
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
                    <label>Short Code</label>  
                  </b-col>
                  <b-col>
                    <b-form-input 
                      v-model="company.short_code"
                      type="text"
                      placeholder="Enter short code"
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
              stacked="md"
              :items="products"
              :fields="fields"
              :current-page="currentPage"
              :per-page="perPage"
              :filter="filter"
              @filtered="onFiltered">
              <template slot="name" slot-scope="row">{{ row.value }}</template>
              <template slot="actions" slot-scope="row">
                <b-button size="sm" variant="info" @click.stop="editProduct(row.item, row.index, $event.target)" class="mr-1">
                  Edit
                </b-button>
                <b-button size="sm" variant="danger" @click.stop="openDeleteProductModal(row.item, row.index, $event.target)" class="mr-1">
                  Delete
                </b-button>
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
            <b-modal id="editProductModal" title="Edit Product">
              <b-form-input v-model="editModalInfo.name"
                type="text"
                placeholder="Enter product name">
              </b-form-input>
              <div slot="modal-footer" class="w-100">
                <b-btn size="sm" class="float-right" variant="primary" @click="updateProduct">
                   Update
                </b-btn>
              </div>
            </b-modal>

            <!-- DELETE MODAL -->
            <b-modal header-bg-variant="danger" id="deleteProductModal" title="Delete Product">
              <p>Are you sure want to delete this product ?</p>
              <div slot="modal-footer" class="w-100">
                <b-btn size="md" class="modal_btns" variant="secondary" @click="deleteProduct">
                   Yes
                </b-btn>
                <b-btn size="md" class="modal_btns" variant="primary" @click="closeDeleteProductModal">
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

let products = []

export default {
  name: 'Companies',
  data () {
    return {
      breadcrumb_items: [
        { text: 'Dashboard', href: '/' }, 
        { text: 'Companies', active: true }
      ],
      fields: [
        { key: 'name', label: 'Product Name', sortable: true },
        { key: 'actions', label: 'Actions' }
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: products.length,
      pageOptions: [ 5, 10, 15 ],
      filter: null,
      editModalInfo: { name: '', id: 0 },
      err_msg: '',
      add_err: false,
      edit_err: false,
      delete_id: 0,
      company: { 
        name: '', 
        address: '', 
        source: '', 
        destination: '', 
        short_code: '', 
        quantity: '', 
        rate: '', 
        short_code: ''}
    }
  },
  mounted () {
    this.getProducts()
  },
  methods: {
    getProducts () {
      this.$store.dispatch('GET_PRODUCTS')
    },

    // CALLING NOTIFICATIONS AFTER EACH OPERATION
    callNotification (type,msg) {
      this.$notify({
        group: 'company_notifications',
        type: 'warn',
        title: type,
        text: msg
      });
    },

    // OPEN AND CLOSE MODALS
    closeDeleteProductModal () {
      this.$root.$emit('bv::hide::modal', 'deleteProductModal')
    },
    openDeleteProductModal (item, index, button) {
      this.delete_product_id = item.id
      this.$root.$emit('bv::show::modal', 'deleteProductModal', button)
    },

    // SEARCH FILTER
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },

    // CRUD METHODS
    addCompany () {
      if (this.company.name === '') {
        this.add_err = true
        this.err_msg = 'Company name required'
      } else if (this.company.name.length < 3) {
        this.add_err = true
        this.err_msg = 'Company name must be atleast 3 characters'
      } else if (this.company.address === '') {
        this.add_err = true
        this.err_msg = "Address required"
      } else if (this.company.source === '') {
        this.add_err = true
        this.err_msg = "Source required"
      } else if (this.company.destination === '') {
        this.add_err = true
        this.err_msg = "Destination required"
      } else if (this.company.quantity === '') {
        this.add_err = true
        this.err_msg = "Quantity required"
      } else if (this.company.rate === '') {
        this.add_err = true
        this.err_msg = "Rate required"
      } else if (this.company.short_code === '') {
        this.add_err = true
        this.err_msg = "Short code required"
      } else {
        this.add_err = false
        this.err_msg = ''
      }

      if (!this.add_err) {
        this.$store.dispatch('ADD_COMPANY', this.company)
        this.callNotification('ADD COMPANY','Company added successfully')
        this.company.name = ''
        this.company.address = ''
        this.company.source = ''
        this.company.destination = ''
        this.company.quantity = ''
        this.company.rate = ''
        this.company.short_code = ''
      }
    },
    editProduct (item, index, button) {
      this.editModalInfo.name = item.name
      this.editModalInfo.id = item.id
      this.$root.$emit('bv::show::modal', 'editProductModal', button)
    },
    updateProduct () {
      this.$root.$emit('bv::hide::modal', 'editProductModal')
      this.$store.dispatch('UPDATE_PRODUCT',this.editModalInfo)
      this.getProducts()
      this.callNotification('UPDATE PRODUCT','Product updated successfully')
    },
    deleteProduct () {
      let data = { id: this.delete_product_id }
      this.$store.dispatch('DELETE_PRODUCT',data)
      this.closeDeleteProductModal()
      this.getProducts()
      this.callNotification('DELETE PRODUCT','Product deleted successfully')
    },
  },
  computed: {

    // GETTING PRODUCTS FROM VUEX STORE
    products () {
      products = this.$store.getters.PRODUCTS
      return this.$store.getters.PRODUCTS
    }
  },
  components: {
    Navbar,
    Sidebar
  }
}
</script>

<style scoped>
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
}
</style>