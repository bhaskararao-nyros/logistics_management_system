<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */


    public function home()
    {
        return view('vueApp');
    }
    public function index()
    {
        //
        return Product::orderBy('id', 'DESC')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $create = Product::create($request->all());
        // return response()->json(['status' => 'success','msg'=>'Product created successfully']);
        if ($create) {
            return Product::orderBy('id', 'DESC')->first();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        //
        $product = Product::find($request->id);
        if($product->count()){
            $product->name = $request->name;
            $product->save();
            return response()->json(['statur'=>'success','msg'=>'updated']);
        } else {
            return response()->json(['statur'=>'error','msg'=>'error in updating product']);
        }
        // return $request->all();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        //
        $product = Product::find($request->id);
        if($product->count()){
          $product->delete();
          return response()->json(['statur'=>'success','msg'=>'product deleted successfully']);
        } else {
          return response()->json(['statur'=>'error','msg'=>'error in deleting product']);
        }
    }
}
