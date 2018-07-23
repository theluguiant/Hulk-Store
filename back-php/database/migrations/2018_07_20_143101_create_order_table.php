<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {   Schema::defaultStringLength(255);
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('users_id',false,true)->length(10); 
            $table->foreign('users_id')->references('id')->on('users');
            $table->string('internal_url');
            $table->string('date');
            $table->integer('total_order',false)->length(10);
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
        Schema::dropIfExists('order');
    }
}
