<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::defaultStringLength(255);
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name',255);
            $table->string('lastname',255)->nullable();
            $table->string('username',255)->nullable();
            $table->string('email',255)->nullable();
            $table->string('address',255)->nullable();
            $table->integer('phone',false)->length(10)->nullable();
            $table->integer('identification',false)->length(10)->nullable();
            $table->integer('delete',false)->length(10)->nullable();
            $table->string('internal_url',255)->nullable();
            $table->integer('roles_id',false,true); 
            $table->foreign('roles_id')->references('id')->on('roles');
            $table->string('password',255);
            $table->rememberToken();
            $table->timestamps();
        });
        
       /* Schema::defaultStringLength(255);
        Schema::table('users', function (Blueprint $table) {
            
            $table->string('email',255)->unique()->change();
            $table->string('address',255)->nullable();
            $table->integer('phone',11)->nullable();
            $table->integer('identification',11)->nullable();
            $table->integer('delete',1)->nullable();
            $table->string('internal_url',255)->nullable();
        });*/
      
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
