<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Vendor;

class VendorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return Vendor::orderBy('id', 'DESC')->get();
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
        //
        $create = Vendor::create($request->all());
        if ($create) {
            return Vendor::orderBy('id', 'DESC')->first();
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
        $vendor = Vendor::find($request->id);
        if($vendor->count()){
            $vendor->name = $request->name;
            $vendor->address = $request->address;
            $vendor->margin_loss = $request->margin_loss;
            $vendor->save();
            return response()->json(['statur'=>'success','msg'=>'updated']);
        } else {
            return response()->json(['statur'=>'error','msg'=>'error in updating vendor']);
        }
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
        $vendor = Vendor::find($request->id);
        if($vendor->count()){
          $vendor->delete();
          return response()->json(['statur'=>'success','msg'=>'vendor deleted successfully']);
        } else {
          return response()->json(['statur'=>'error','msg'=>'error in deleting vendor']);
        }
    }
}
