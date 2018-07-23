<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::post('/api/register','UserController@register');
Route::post('/api/login','UserController@login');
Route::post('/api/get-users','UserController@index');
Route::post('/api/user-delete','UserController@deleteUser');

Route::post('/api/add-admin-product','ProductController@addProduct');
Route::post('/api/get-all-products','ProductController@index');
Route::post('/api/products-delete','ProductController@deleteProduct');
Route::post('/api/products-update/{id}','ProductController@update');
Route::post('/api/product-get/{id}','ProductController@show');


Route::post('/api/gettoken','CheckTokenController@getToken');
Route::post('/api/getidentity','CheckTokenController@getTokenIdentity');
Route::post('/api/checktoken','CheckTokenController@checkIdentity');
Route::post('/api/is-auth-admin','UserController@isAuthUserRoutingAdmin');

Route::post('/api/get-all-categories','CategoriesController@index');
Route::post('/api/category-create','CategoriesController@addCategory');
Route::post('/api/category-delete','CategoriesController@deleteCategory');
Route::post('/api/category-get/{id}','CategoriesController@show');
Route::post('/api/category-update/{id}','CategoriesController@update');


