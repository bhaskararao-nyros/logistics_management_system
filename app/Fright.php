<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Fright extends Model
{
    //
    protected $table = 'fright';
    protected $fillable = ['product', 'quantity', 'source', 'destination', 'fright', 'distance'];
}
