<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLrEntryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lr_entry', function (Blueprint $table) {
            $table->increments('id');
            $table->increments('lr_no');
            $table->string('source');
            $table->string('destination');
            $table->string('consignor');
            $table->string('consignee');
            $table->string('product');
            $table->string('quantity');
            $table->string('tanker');
            $table->string('total_fright');
            $table->string('driver');
            $table->string('advance_amount');
            $table->string('advance_type');
            $table->string('shortage');
            $table->string('balance_fright');
            $table->tinyInteger('receipt_status')->default('0');
            $table->tinyInteger('payment_status')->default('0');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lr_entry');
    }
}
