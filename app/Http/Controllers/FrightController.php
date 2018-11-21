<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Fright;

class FrightController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response 
     */
    public function home()
    {
        //
        return view('vueApp');
    }

    public function index()
    {
        //
        return Fright::orderBy('id', 'DESC')->get();
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
        $create = Fright::create($request->all());
        if ($create) {
            return Fright::orderBy('id', 'DESC')->first();
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
        $fright = Fright::find($request->id);
        if($fright->count()){
            $fright->product = $request->product;
            $fright->quantity = $request->quantity;
            $fright->source = $request->source;
            $fright->destination = $request->destination;
            $fright->fright = $request->rate;
            $fright->distance = $request->distance;
            $fright->save();
            return response()->json(['status'=>'success','msg'=>'updated']);
        } else {
            return response()->json(['status'=>'error','msg'=>'error in updating fright']);
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
        $fright = Fright::find($request->id);
        if($fright->count()){
          $fright->delete();
          return response()->json(['status'=>'success','msg'=>'fright deleted successfully']);
        } else {
          return response()->json(['status'=>'error','msg'=>'error in deleting fright']);
        }
    }
}
