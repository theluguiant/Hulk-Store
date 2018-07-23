<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {   Schema::defaultStringLength(255);
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('users_id',false,true)->length(10); 
            $table->foreign('users_id')->references('id')->on('users');
            $table->string('name');
            $table->text('description');
            $table->string('internal_url');
            $table->integer('brand',false)->length(10);
            $table->integer('price',false)->length(10);
            $table->integer('discount',false)->length(3);
            $table->integer('stock',false)->length(10);
            $table->integer('category_id',false,true)->length(10); 
            $table->foreign('category_id')->references('id')->on('category');
            $table->integer('delete',false)->length(1);
            $table->string('size');
            $table->string('code');
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
        Schema::dropIfExists('products');
    }
}
