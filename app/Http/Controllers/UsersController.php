<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Users;

class UsersController extends Controller
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
        return Users::orderBy('id', 'DESC')->get();
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
        $create = Users::create($request->all());
        if ($create) {
            return Users::orderBy('id', 'DESC')->first();
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
        $user = Users::find($request->id);
        if($user->count()){
            $user->name = $request->name;
            $user->address = $request->address;
            $user->role_as = $request->role_as;
            $user->save();
            return response()->json(['status'=>'success','msg'=>'updated']);
        } else {
            return response()->json(['status'=>'error','msg'=>'error in updating user']);
        }
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

    public function activation(Request $request)
    {
        //
        $user = Users::find($request->id);
        if($user->count()){
            $user->status = $request->status;
            $user->save();
            return response()->json(['status'=>'success','msg'=>'user activated']);
        } else {
            return response()->json(['status'=>'error','msg'=>'error in user activation']);
        }
    }

    public function deactivation(Request $request)
    {
        //
        $user = Users::find($request->id);
        if($user->count()){
            $user->status = $request->status;
            $user->save();
            return response()->json(['status'=>'success','msg'=>'user deactivated']);
        } else {
            return response()->json(['status'=>'error','msg'=>'error in user deactivation']);
        }
    }
}
