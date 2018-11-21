<template>
  <div class="dashboard">
    <!-- NOTIFICATIONS COMPONENT -->
    <notifications group="lr_entry_notifications" />
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
                    <label>Source</label>  
                  </b-col>
                  <b-col>
                  <vue-bootstrap-typeahead 
                    v-model="query"
                    :data="sources"
                  />
                    <!-- <b-form-input 
                      v-model="lr_entry.source"
                      type="text"
                      placeholder="Enter source"
                      class="form_input">
                    </b-form-input> -->
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
                      v-model="lr_entry.destination"
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
                    <label>Consignor</label>  
                  </b-col>
                  <b-col>
                    <select v-model="lr_entry.consignor" class="form-control">
                      <option value="select">Select</option>
                      <option v-for="vendor in vendors">{{ vendor.name }}</option>
                    </select>
                  </b-col>
                </b-row>
              </b-col>
              <b-col>
                <b-row>
                  <b-col cols="3">
                    <label>Consignee</label>  
                  </b-col>
                  <b-col>
                    <b-form-input 
                      v-model="lr_entry.consignee"
                      type="text"
                      placeholder="Enter consignee"
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
                    <label>Product</label>  
                  </b-col>
                  <b-col>
                    <select v-model="lr_entry.product" class="form-control">
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
                    <b-form-input 
                      v-model="lr_entry.quantity"
                      type="text"
                      placeholder="Enter quantity"
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
                    <label>Tanker</label>  
                  </b-col>
                  <b-col>
                    <select v-model="lr_entry.tanker" class="form-control">
                      <option value="select">Select</option>
                      <option v-for="tanker in tankers">{{ tanker.number }}</option>
                    </select>
                  </b-col>
                </b-row>
              </b-col>
              <b-col>
                <b-row>
                  <b-col cols="3">
                    <label>Amount</label>  
                  </b-col>
                  <b-col>
                    <b-form-input 
                      v-model="lr_entry.total_fright"
                      type="text"
                      placeholder="Enter amount"
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
                    <label>Tanker</label>  
                  </b-col>
                  <b-col>
                    <b-form-input 
                      v-model="lr_entry.driver"
                      type="text"
                      placeholder="Enter driver name"
                      class="form_input">
                    </b-form-input>
                  </b-col>
                </b-row>
              </b-col>
              <b-col>

              </b-col>
            </b-row>
            <b-button type="submit" class="add_product_btn" size="sm">Create LR</b-button>
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
              :items="lr_entries"
              :fields="fields"
              :current-page="currentPage"
              :per-page="perPage"
              :filter="filter"
              @filtered="onFiltered"
              class="lr_table_class">
              <template slot="serial_no" slot-scope="row">{{ row.index + 1 }}</template>
              <template slot="name" slot-scope="row">{{ row.value }}</template>
              <template slot="receipt_status" slot-scope="row">
                <div v-if="row.value === 0" class="text-info">
                  <b-button variant="secondary" size="sm" @click.stop="openAddReceiptModal(row.item)" class="mr-1">
                    <font-awesome-icon icon="plus-circle" /> Receipt
                  </b-button>
                </div>
                <div v-else>
                  <b-button variant="info" size="sm">
                    <font-awesome-icon icon="eye" /> Receipt
                  </b-button>
                </div>
              </template>
              <template slot="payment_status" slot-scope="row">
                <div v-if="row.value === 0" class="text-danger">Pending</div>
                <div v-else class="text-success">Completed</div>
              </template>
              <template slot="actions" slot-scope="row">
              <b-button variant="primary" size="sm" @click.stop="viewLrInfo(row.item, row.index, $event.target)" class="mr-1">
                <font-awesome-icon icon="eye" /> LR
              </b-button>
                <b-button variant="info" v-if="row.item.advance_amount !== null" size="sm">
                  <font-awesome-icon icon="eye" /> Advance
                </b-button>
                <b-button v-if="row.item.receipt_status === 0 || row.item.advance_amount === null" variant="secondary" size="sm">
                  <font-awesome-icon icon="plus-circle" /> Advance
                </b-button>
              </template>
            </b-table>
            <!-- TABLE PAGINATION -->
            <b-row class="pagination_row">
              <b-col md="6" class="my-1">
                <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
              </b-col>
            </b-row>

            <b-modal id="viewLrModal" class="view_lr_modal" size="lg" title="LR Details" ok-only>
              <b-row class="form_row_margin">
                <b-col>
                  <b-row>
                    <b-col cols="3">
                      <label>Source:</label>  
                    </b-col>
                    <b-col>
                      {{ viewLrModalInfo.source }}
                    </b-col>
                  </b-row>
                </b-col>
                <b-col>
                  <b-row>
                    <b-col cols="3">
                      <label>Destination:</label>  
                    </b-col>
                    <b-col>
                      {{ viewLrModalInfo.destination }}
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
              <b-row class="form_row_margin">
                <b-col>
                  <b-row>
                    <b-col cols="3">
                      <label>Consignor:</label>  
                    </b-col>
                    <b-col>
                      {{ viewLrModalInfo.consignor }}
                    </b-col>
                  </b-row>
                </b-col>
                <b-col>
                  <b-row>
                    <b-col cols="3">
                      <label>Consignee:</label>  
                    </b-col>
                    <b-col>
                      {{ viewLrModalInfo.consignee }}
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
              <b-row class="form_row_margin">
                <b-col>
                  <b-row>
                    <b-col cols="3">
                      <label>Product:</label>  
                    </b-col>
                    <b-col>
                      {{ viewLrModalInfo.product }}
                    </b-col>
                  </b-row>
                </b-col>
                <b-col>
                  <b-row>
                    <b-col cols="3">
                      <label>Quantity:</label>  
                    </b-col>
                    <b-col>
                      {{ viewLrModalInfo.quantity }} tonnes
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
              <b-row class="form_row_margin">
                <b-col>
                  <b-row>
                    <b-col cols="3">
                      <label>Tanker:</label>  
                    </b-col>
                    <b-col>
                      {{ viewLrModalInfo.tanker }}
                    </b-col>
                  </b-row>
                </b-col>
                <b-col>
                  <b-row>
                    <b-col cols="3">
                      <label>Amount:</label>  
                    </b-col>
                    <b-col>
                      &#8377; {{ viewLrModalInfo.total_fright }}
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
              <b-row class="form_row_margin">
                <b-col>
                  <b-row>
                    <b-col cols="3">
                      <label>Driver:</label>  
                    </b-col>
                    <b-col>
                      {{ viewLrModalInfo.driver }}
                    </b-col>
                  </b-row>
                </b-col>
                <b-col>
                  <!-- empty col for alignment -->
                </b-col>
              </b-row>
            </b-modal>

             <b-modal class="edit_modal" size="lg" id="addReceiptModal" :title="add_receipt_modal_title">
              <div v-if="edit_err" class="text-center">
                <p class="text-danger">* {{ err_msg }}</p>
              </div>
              <b-form>
                <b-row class="form_row_margin">
                  <b-col>
                    <b-row>
                      <b-col cols="3">
                        <label>Shortage</label>  
                      </b-col>
                      <b-col>
                        <b-form-input 
                          v-model="add_receipt.shortage"
                          type="text"
                          placeholder="Enter shortage"
                          class="form_input">
                        </b-form-input>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col>
                    <b-row>
                      <b-col cols="3">
                        <label>Fright</label>  
                      </b-col>
                      <b-col>
                        <b-form-input 
                          v-model="add_receipt.fright"
                          type="text"
                          placeholder="Enter fright"
                          class="form_input"
                          disabled>
                        </b-form-input>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row class="form_row_margin">
                  <b-col>
                    <b-row>
                      <b-col cols="3">
                        <label>Shortage Amount</label>  
                      </b-col>
                      <b-col>
                        <b-form-input 
                          v-model="add_receipt.shortage_amount"
                          type="text"
                          placeholder="Enter shortage amount"
                          class="form_input">
                        </b-form-input>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col>
                    <b-row>
                      <b-col cols="3">
                        <label>Balance</label>  
                      </b-col>
                      <b-col>
                        <b-form-input 
                          v-model="add_receipt.balance"
                          type="text"
                          placeholder="Enter balance"
                          class="form_input">
                        </b-form-input>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-form>
              <div slot="modal-footer" class="w-100">
                <b-btn size="sm" class="float-right" variant="primary" @click="addReceipt">
                   Add Receipt
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

import Sidebar from './Sidebar'; 
import Navbar from './Navbar';
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'


let lr_entries = []

export default {
  name: 'Lrentry',
  data () {
    return {
      breadcrumb_items: [
        { text: 'Dashboard', href: '/' }, 
        { text: 'LR Entry', active: true }
      ],
      fields: [
        { key: 'serial_no', label: 'S.No', sortable: true },
        { key: 'lr_no', label: 'LR No', sortable: true },
        { key: 'consignor', label: 'Consignor', sortable: true },
        { key: 'consignee', label: 'Consignee', sortable: true },
        { key: 'receipt_status', label: 'Receipt Status', sortable: true },
        { key: 'payment_status', label: 'Payment Status', sortable: true },
        { key: 'actions', label: 'Actions' }
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: lr_entries.length,
      pageOptions: [ 5, 10, 15 ],
      filter: null,
      viewLrModalInfo: {},
      err_msg: '',
      add_err: false,
      edit_err: false,
      delete_id: 0,
      lr_entry: { 
        lr_no: '0001',
        source: '', 
        destination: '',
        consignor: 'select', 
        consignee: '', 
        product: 'select', 
        quantity: '', 
        tanker: 'select',
        driver: '',
        receipt_status: 0,
        payment_status: 0,
        advance_amount: '',
        advance_type: { hsd: '', cash: '', commission: '', bank: '' },
        shortage: '',
        total_fright: '',
        balance_fright: '',
      },
      add_receipt: { id: 0, fright: '' },
      add_receipt_modal_title: '',
      query: ''
    }
  },
  mounted () {
    document.title = "LR Entry - LMS"
    this.get_lr_entries()
  },
  methods: {
    get_lr_entries () {
      this.$store.dispatch('GET_LR_ENTRIES')
      this.$store.dispatch('GET_LAST_LR_NUMBER')
    },

    // CALLING NOTIFICATIONS AFTER EACH OPERATION
    callNotification (type,msg) {
      this.$notify({
        group: 'lr_entry_notifications',
        type: 'warn',
        title: type,
        text: msg
      });
    },
    getLastLrNo () {
      return this.$store.getters.LR_NUMBER
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
      if (this.lr_entry.source === '') {
        this.add_err = true
        this.err_msg = 'Source required'
      } else if (this.lr_entry.destination === '') {
        this.add_err = true
        this.err_msg = 'Destination required'
      } else if (this.lr_entry.consignor === 'select') {
        this.add_err = true
        this.err_msg = "Consignor required"
      } else if (this.lr_entry.consignee === '') {
        this.add_err = true
        this.err_msg = "Consignee required"
      } else if (this.lr_entry.product === 'select') {
        this.add_err = true
        this.err_msg = "Product required"
      } else if (this.lr_entry.quantity === '') {
        this.add_err = true
        this.err_msg = "Quantity required"
      } else if (this.lr_entry.tanker === 'select') {
        this.add_err = true
        this.err_msg = "Tanker required"
      } else if (this.lr_entry.total_fright === '') {
        this.add_err = true
        this.err_msg = "Amount required"
      } else if (this.lr_entry.driver === '') {
        this.add_err = true
        this.err_msg = "Driver required"
      } else {
        this.add_err = false
        this.err_msg = ''
      }

      if (!this.add_err) {
        let add_zeros;
        if (this.$store.getters.LR_NUMBER !== undefined) {
          let last_lr_no = parseInt(this.$store.getters.LR_NUMBER)
          last_lr_no += 1
          if (last_lr_no.toString().length === 1) {
            add_zeros = '000'
          }
          if (last_lr_no.toString().length === 2) {
            add_zeros = '00'
          }
          if (last_lr_no.toString().length === 3) {
            add_zeros = '0'
          }
          this.lr_entry.lr_no = add_zeros + last_lr_no;
        }

        this.$store.dispatch('ADD_LR_ENTRY', this.lr_entry)
        this.get_lr_entries()
        this.callNotification('CREATE LR ENTRY','LR entry created successfully')
        // this.lr_entry.name = ''
        // this.lr_entry.address = ''
        // this.lr_entry.source = ''
        // this.lr_entry.destination = ''
        // this.lr_entry.quantity = ''
        // this.lr_entry.rate = ''
        // this.lr_entry.short_code = ''
      }
    },
    viewLrInfo (item, index, button) {
      console.log('item---------', item)
      this.viewLrModalInfo = item
      this.$root.$emit('bv::show::modal', 'viewLrModal', button)
    },
    openAddReceiptModal (item) {
      this.add_receipt_modal_title = 'Add Receipt - '+ item.lr_no
      this.add_receipt.fright = item.total_fright
      this.add_receipt.id = item.id
      this.$root.$emit('bv::show::modal', 'addReceiptModal')
    },
    addReceipt () {
      if (this.add_receipt.shortage === '') {
        this.edit_err = true
        this.err_msg = "Shortage required"
      }
      else if (this.add_receipt.shortage_amount === '') {
        this.edit_err = true
        this.err_msg = "Shortage amount required"
      }
      else if (this.add_receipt.balance === '') {
        this.edit_err = true
        this.err_msg = "Balance required"
      } else {
        this.edit_err = false
        this.err_msg = ""
      }

      if (!this.edit_err) {
        this.$store.dispatch('ADD_RECEIPT',this.add_receipt)
        this.$root.$emit('bv::hide::modal', 'addReceiptModal')
        this.getlr_entries()
        this.callNotification('ADD RECEIPT','Receipt added successfully')
      }

    },
    deleteItem () {
      let data = { id: this.delete_id }
      this.$store.dispatch('DELETE_lr_entry',data)
      this.closeDeleteModal()
      this.getlr_entries()
      this.callNotification('DELETE lr_entry','lr_entry deleted successfully')
    },
  },
  computed: {

    // GETTING VENDORS FROM VUEX STORE
    vendors () {
      return this.$store.getters.VENDORS
    },
    products () {
      return this.$store.getters.PRODUCTS
    },
    tankers () {
      return this.$store.getters.TANKERS
    },
    lr_entries () {
      lr_entries = this.$store.getters.LR_ENTRIES
      return this.$store.getters.LR_ENTRIES
    },
    get_last_lr_number () {
      return this.$store.getters.LR_NUMBER
    },
    sources () {
      return this.$store.getters.SOURCES
    },
    destinations () {
      return this.$store.getters.DESTINATIONS
    }
  },
  components: {
    Navbar,
    Sidebar,
    VueBootstrapTypeahead
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
.lr_table_class th.sorting {
  width: 13% !important;
}
.view_lr_modal label {
  font-weight: bold;
  float: right;
  margin-top: 0px !important;
}

</style>