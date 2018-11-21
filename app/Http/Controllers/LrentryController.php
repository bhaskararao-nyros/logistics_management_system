<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Lrentry;

class LrentryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return Lrentry::orderBy('id', 'DESC')->get();
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
        $create = Lrentry::create($request->all());
        if ($create) {
            return Lrentry::orderBy('id', 'DESC')->first();
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
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function getLastLr()
    {
        //
        return Lrentry::orderBy('id', 'DESC')->first();
    }

    public function createReceipt(Request $request)
    {
        //
        $receipt = Lrentry::find($request->id);
        if($receipt->count()){
            $receipt->shortage = $request->shortage;
            $receipt->shortage_amount = $request->shortage_amount;
            $receipt->balance_fright = $request->balance;
            $receipt->receipt_status = 1;
            $receipt->save();
            return response()->json(['status'=>'success','msg'=>'updated']);
        } else {
            return response()->json(['status'=>'error','msg'=>'error in updating receipt']);
        }
    }
}
