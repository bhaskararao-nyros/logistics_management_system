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


// PRODUCT ROUTES

// Route::get('/', 'ProductController@home');
Route::resource('/products', 'ProductController');
Route::post('/add_product', 'ProductController@store');
Route::post('/update_product', 'ProductController@update');
Route::post('/delete_product', 'ProductController@destroy');

// COMPANY ROUTES

// Route::resource('/companies', 'CompanyController');
// Route::get('/', 'CompanyController@home');
Route::resource('/companies', 'CompanyController');
Route::post('/add_company', 'CompanyController@store');
Route::post('/update_company', 'CompanyController@update');
Route::post('/delete_company', 'CompanyController@destroy');

// TANKER ROUTES

Route::get('/', 'TankerController@home');
Route::resource('/tankers', 'TankerController');
Route::post('/add_tanker', 'TankerController@store');
Route::post('/update_tanker', 'TankerController@update');
Route::post('/delete_tanker', 'TankerController@destroy');

// USER ROUTES

Route::get('/', 'UsersController@home');
Route::resource('/users', 'UsersController');
Route::post('/add_user', 'UsersController@store');
Route::post('/update_user', 'UsersController@update');
Route::post('/activate_user', 'UsersController@activation');
Route::post('/deactivate_user', 'UsersController@deactivation');

// FRIGHT ROUTES

Route::get('/', 'FrightController@home');
Route::resource('/frights', 'FrightController');
Route::post('/add_fright', 'FrightController@store');
Route::post('/update_fright', 'FrightController@update');
Route::post('/delete_fright', 'FrightController@destroy');

Route::get('/{vue_capture?}', function () {
    return view('vueApp');
})->where('vue_capture', '[\/\w\.-]*');
