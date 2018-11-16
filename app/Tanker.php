<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tanker extends Model
{
    //
    protected $table = 'tankers';
    protected $fillable = ['number', 'owner', 'account_name', 'ifsc_code', 'account_number', 'bank_name', 'branch_name'];
}
