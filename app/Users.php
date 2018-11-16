<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
    //
    protected $table = 'users_tb';
    protected $fillable = ['name', 'address', 'role_as'];
}
