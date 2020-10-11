<?php

namespace App\Http\Controllers;
// include(__DIR__.'/phpqrcode.php');

use Illuminate\Http\Request;

class QrController extends Controller
{
    public function generate(Request $request,$id){
        
        
      
        
    }
    public function sendFile(Request $request){
        try{

        $root = $_SERVER['DOCUMENT_ROOT'];
        require_once( $root.'/phpqrcode.php');

        $name=$request->input('productName');
        $filesArray = $request->file('files');
        foreach($filesArray as $f){
            $ext = $f->extension();
            $guid = uniqid();
            $file_path="$guid.$ext";
            $f->storeAs('public',$file_path);
        break;
        }
        
        $qrcode_path = "./storage/qr$guid.png";
        $file_path="/storage/$file_path";
        // return $root.$qrcode_path;
        $siteOrigin = $_SERVER['HTTP_ORIGIN'];
        \QRcode::png($siteOrigin.$file_path, $qrcode_path);
        \DB::table('products')->insert(['name'=>$name,'file_path'=>$file_path,'qrcode_path'=> $qrcode_path]);
    return "OK";
    }
        catch(Exception $ex){
            return $ex->getMessage();
        }
    }
    public function deleteProduct(Request $request,$id){
        return \DB::table('products')->where('id',$id)->delete();
    }
}
