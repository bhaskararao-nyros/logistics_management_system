<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lrentry extends Model
{
    //
    protected $table = 'lr_entry';
    protected $fillable = ['lr_no', 'source', 'destination', 'consignor', 'consignee', 'product', 'quantity', 'tanker', 'total_fright', 'driver', 'advance_amount'];
}
