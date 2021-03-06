<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Company;

class CompanyController extends Controller
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
        return Company::orderBy('id', 'DESC')->get();
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
        // return $request->all();
        $create = Company::create($request->all());
        if ($create) {
            return Company::orderBy('id', 'DESC')->first();
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
        $company = Company::find($request->id);
        if($company->count()){
            $company->name = $request->name;
            $company->address = $request->address;
            $company->short_code = $request->short_code;
            $company->save();
            return response()->json(['statur'=>'success','msg'=>'updated']);
        } else {
            return response()->json(['statur'=>'error','msg'=>'error in updating company']);
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
        $company = Company::find($request->id);
        if($company->count()){
          $company->delete();
          return response()->json(['statur'=>'success','msg'=>'company deleted successfully']);
        } else {
          return response()->json(['statur'=>'error','msg'=>'error in deleting company']);
        }
    }
}
