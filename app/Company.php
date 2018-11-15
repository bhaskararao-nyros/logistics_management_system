<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    //
    protected $table = 'companies';
    protected $fillable = ['name', 'address', 'source', 'destination', 'quantity', 'rate', 'short_code'];
}
