<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Tanker;

class TankerController extends Controller
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
        return Tanker::orderBy('id', 'DESC')->get();
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
        $create = Tanker::create($request->all());
        if ($create) {
            return Tanker::orderBy('id', 'DESC')->first();
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
        $tanker = Tanker::find($request->id);
        if($tanker->count()){
            $tanker->number = $request->number;
            $tanker->owner = $request->owner;
            $tanker->account_name = $request->account_name;
            $tanker->account_number = $request->account_number;
            $tanker->bank_name = $request->bank_name;
            $tanker->branch_name = $request->branch_name;
            $tanker->ifsc_code = $request->ifsc_code;
            $tanker->save();
            return response()->json(['status'=>'success','msg'=>'updated']);
        } else {
            return response()->json(['status'=>'error','msg'=>'error in updating tanker']);
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
        $tanker = Tanker::find($request->id);
        if($tanker->count()){
          $tanker->delete();
          return response()->json(['status'=>'success','msg'=>'tanker deleted successfully']);
        } else {
          return response()->json(['status'=>'error','msg'=>'error in deleting tanker']);
        }
    }
}
