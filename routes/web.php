<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
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


Auth::routes();

Route::get('/get-all-products',function(){
    return DB::table('products')->get();
});
Route::delete('/remove-product/{id}','QrController@deleteProduct');
Route::post('/sendfile','QrController@sendFile');
Route::get('/{any}', 'SpaController@index')->where('any', '.*');