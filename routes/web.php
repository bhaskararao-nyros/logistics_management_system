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

// Route::get('/', function () {
//     return view('welcome');
// });

// Route::get('/', 'ProductController@home');

// PRODUCT ROUTES
Route::resource('/products', 'ProductController');
Route::post('/add_product', 'ProductController@store');
Route::post('/update_product', 'ProductController@update');
Route::post('/delete_product', 'ProductController@destroy');

// COMPANY ROUTES
Route::post('/add_company', 'CompanyController@store');


Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('{any}', function () {
    return view('vueApp');
})->where('any','.*');