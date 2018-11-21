<template>
  <div class="dashboard">
    <!-- NOTIFICATIONS COMPONENT -->
    <notifications group="tanker_notifications" />
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
                    <label>Tanker No</label>  
                  </b-col>
                  <b-col>
                    <b-form-input 
                      v-model="tanker.number"
                      type="text"
                      placeholder="Enter tanker number"
                      class="form_input">
                    </b-form-input>
                  </b-col>
                </b-row>
              </b-col>
              <b-col>
                <b-row>
                  <b-col cols="3">
                    <label>Owner name</label>  
                  </b-col>
                  <b-col>
                    <b-form-input 
                      v-model="tanker.owner"
                      type="text"
                      placeholder="Enter owner name"
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
                    <label>Bank account name</label>  
                  </b-col>
                  <b-col>
                    <b-form-input 
                      v-model="tanker.account_name"
                      type="text"
                      placeholder="Enter bank account name"
                      class="form_input">
                    </b-form-input>
                  </b-col>
                </b-row>
              </b-col>
              <b-col>
                <b-row>
                  <b-col cols="3">
                    <label>IFSC code</label>  
                  </b-col>
                  <b-col>
                    <b-form-input 
                      v-model="tanker.ifsc_code"
                      type="text"
                      placeholder="Enter IFSC code"
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
                    <label>Bank name</label>  
                  </b-col>
                  <b-col>
                    <b-form-input 
                      v-model="tanker.bank_name"
                      type="text"
                      placeholder="Enter bank name"
                      class="form_input">
                    </b-form-input>
                  </b-col>
                </b-row>
              </b-col>
              <b-col>
                <b-row>
                  <b-col cols="3">
                    <label>Branch name</label>  
                  </b-col>
                  <b-col>
                    <b-form-input 
                      v-model="tanker.branch_name"
                      type="text"
                      placeholder="Enter branch name"
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
                    <label>Account No</label>  
                  </b-col>
                  <b-col>
                    <b-form-input 
                      v-model="tanker.account_number"
                      type="text"
                      placeholder="Enter account number"
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
              :items="tankers"
              :fields="fields"
              :current-page="currentPage"
              :per-page="perPage"
              :filter="filter"
              @filtered="onFiltered"
              class="tankers_table">
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
                        <label>Tanker No</label>  
                      </b-col>
                      <b-col>
                        <b-form-input 
                          v-model="editModalInfo.number"
                          type="text"
                          placeholder="Enter tanker number"
                          class="form_input">
                        </b-form-input>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col>
                    <b-row>
                      <b-col cols="3">
                        <label>Owner</label>  
                      </b-col>
                      <b-col>
                        <b-form-input 
                          v-model="editModalInfo.owner"
                          type="text"
                          placeholder="Enter owner name"
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
                        <label>Bank account name</label>  
                      </b-col>
                      <b-col>
                        <b-form-input 
                          v-model="editModalInfo.account_name"
                          type="text"
                          placeholder="Enter bank account name"
                          class="form_input">
                        </b-form-input>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col>
                    <b-row>
                      <b-col cols="3">
                        <label>IFSC code</label>  
                      </b-col>
                      <b-col>
                        <b-form-input 
                          v-model="editModalInfo.ifsc_code"
                          type="text"
                          placeholder="Enter IFSC code"
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
                        <label>Bank name</label>  
                      </b-col>
                      <b-col>
                        <b-form-input 
                          v-model="editModalInfo.bank_name"
                          type="text"
                          placeholder="Enter bank name"
                          class="form_input">
                        </b-form-input>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col>
                    <b-row>
                      <b-col cols="3">
                        <label>Branch name</label>  
                      </b-col>
                      <b-col>
                        <b-form-input 
                          v-model="editModalInfo.branch_name"
                          type="text"
                          placeholder="Enter brach name"
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
                        <label>Account No</label>  
                      </b-col>
                      <b-col>
                        <b-form-input 
                          v-model="editModalInfo.account_number"
                          type="text"
                          placeholder="Enter account number"
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
              <p>Are you sure want to delete this tanker ?</p>
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

let tankers = []

export default {
  name: 'Tankers',
  data () {
    return {
      breadcrumb_items: [
        { text: 'Dashboard', href: '/' }, 
        { text: 'Tankers', active: true }
      ],
      fields: [
        { key: 'serial_no', label: 'S.No', sortable: true },
        { key: 'number', label: 'Tanker Number', sortable: true },
        { key: 'owner', label: 'Owner', sortable: true },
        { key: 'account_name', label: 'Account Name', sortable: true },
        { key: 'account_number', label: 'Account No', sortable: true },
        { key: 'ifsc_code', label: 'IFSC code', sortable: true },
        { key: 'bank_name', label: 'Bank Name', sortable: true },
        { key: 'branch_name', label: 'Branch Name', sortable: true },
        { key: 'actions', label: 'Actions' }
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: tankers.length,
      pageOptions: [ 5, 10, 15 ],
      filter: null,
      editModalInfo: { number: '', id: 0 },
      err_msg: '',
      add_err: false,
      edit_err: false,
      delete_id: 0,
      tanker: { 
        number: '', 
        owner: '', 
        account_name: '', 
        ifsc_code: '', 
        bank_name: '', 
        branch_name: '', 
        account_number: ''
      }
    }
  },
  mounted () {
    document.title = "Tankers - LMS"
    this.getTankers()
  },
  methods: {
    getTankers () {
      this.$store.dispatch('GET_TANKERS')
    },

    // CALLING NOTIFICATIONS AFTER EACH OPERATION
    callNotification (type,msg) {
      this.$notify({
        group: 'tanker_notifications',
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
      if (this.tanker.number === '') {
        this.add_err = true
        this.err_msg = 'Tanker number required'
      } else if (this.tanker.owner === '') {
        this.add_err = true
        this.err_msg = "Owner name required"
      } else if (this.tanker.account_name === '') {
        this.add_err = true
        this.err_msg = "Account name required"
      } else if (this.tanker.ifsc_code === '') {
        this.add_err = true
        this.err_msg = "IFSC code required"
      } else if (this.tanker.account_number === '') {
        this.add_err = true
        this.err_msg = "Account number required"
      } else if (this.tanker.bank_name === '') {
        this.add_err = true
        this.err_msg = "Bank name required"
      } else if (this.tanker.branch_name === '') {
        this.add_err = true
        this.err_msg = "Branch name required"
      } else {
        this.add_err = false
        this.err_msg = ''
      }

      if (!this.add_err) {
        this.$store.dispatch('ADD_TANKER', this.tanker)
        this.callNotification('ADD TANKER','Tanker added successfully')
        // this.tanker.name = ''
        // this.tanker.address = ''
        // this.tanker.source = ''
        // this.tanker.destination = ''
        // this.tanker.quantity = ''
        // this.tanker.rate = ''
        // this.tanker.short_code = ''
      }
    },
    edit (item, index, button) {
      this.editModalInfo.id = item.id
      this.editModalInfo.number = item.number
      this.editModalInfo.owner = item.owner
      this.editModalInfo.bank_name = item.bank_name
      this.editModalInfo.account_number = item.account_number
      this.editModalInfo.account_name = item.account_name
      this.editModalInfo.branch_name = item.branch_name
      this.editModalInfo.ifsc_code = item.ifsc_code
      this.$root.$emit('bv::show::modal', 'editModal', button)
    },
    update () {

      if (this.editModalInfo.number === '') {
        this.edit_err = true
        this.err_msg = 'Tanker number required'
      } else if (this.editModalInfo.owner === '') {
        this.edit_err = true
        this.err_msg = "Owner name required"
      } else if (this.editModalInfo.bank_name === '') {
        this.edit_err = true
        this.err_msg = "Bank name required"
      } else if (this.editModalInfo.branch_name === '') {
        this.edit_err = true
        this.err_msg = "Branch name required"
      } else if (this.editModalInfo.account_name === '') {
        this.edit_err = true
        this.err_msg = "Account name required"
      } else if (this.editModalInfo.account_number === '') {
        this.edit_err = true
        this.err_msg = "Account number required"
      } else if (this.editModalInfo.ifsc_code === '') {
        this.edit_err = true
        this.err_msg = "IFSC code required"
      } else {
        this.edit_err = false
        this.err_msg = ''
      }

      if (!this.edit_err) {
        this.$root.$emit('bv::hide::modal', 'editModal')
        this.$store.dispatch('UPDATE_TANKER',this.editModalInfo)
        this.getTankers()
        this.callNotification('UPDATE TANKER','Tanker updated successfully')
      }
    },
    deleteItem () {
      let data = { id: this.delete_id }
      this.$store.dispatch('DELETE_TANKER',data)
      this.closeDeleteModal()
      this.getTankers()
      this.callNotification('DELETE TANKER','Tanker deleted successfully')
    },
  },
  computed: {

    // GETTING PRODUCTS FROM VUEX STORE
    tankers () {
      tankers = this.$store.getters.TANKERS
      return this.$store.getters.TANKERS
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
.form_row_margin {
  margin-top: 2px;
  margin-left: 1%;
}
.tankers_table th.sorting {
  width: 1% !important;
}
</style>