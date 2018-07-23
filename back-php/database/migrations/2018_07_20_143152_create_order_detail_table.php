<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrderDetailTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {   Schema::defaultStringLength(255);
        Schema::create('order_detail', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('products_id',false,true)->length(10);
            $table->foreign('products_id')->references('id')->on('products');
            $table->integer('quantity',false)->length(10);
            $table->string('internal_url');
            $table->integer('orders_id',false,true)->length(10);
            $table->foreign('orders_id')->references('id')->on('orders');
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
        Schema::dropIfExists('order_detail');
    }
}
