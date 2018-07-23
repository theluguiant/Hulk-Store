<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Validator;
use App\Http\Controllers\InputController;
use App\Helpers\JwtAuth;
use App\Http\Controllers\CheckTokenController;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\ProductRequest;
use Illuminate\Support\Facades\DB;
use App\Product;

class ProductController extends Controller
{
    public $oToken;
    public $oInput;
    
    public function __construct()
    {
        $this->oToken = new CheckTokenController();
        $this->oToken = $this->oToken->getJwtAuth();
        $this->oInput = new InputController();
    }
    
    public function index(Request $request){
        $aJson = $request->input('json',null);
        $this->oInput = new InputController();       
        $aParams  = $this->oInput->processResquest($aJson)['aParams'];
        
        
        if($this->oToken->checkToken($aParams->token)){
            $aProductAll = Product::all();
           
            return [
                'status' => 'success',
                'type'   => 'payload',
                'payload' => $aProductAll
            ];
        }
    }
    
    public function addProduct(Request $request){
        $hash = $request->header('Authorization',null);
        
        if($this->oToken->checkToken($hash)){

            $aJson = $request->input('json',null);

            $aParams  = $this->oInput->processResquest($aJson)['aParams'];
            $aParamsArray = $this->oInput->processResquest($aJson)['aParamsArray'];

            $oUser = $this->oToken->checkToken($hash,true);
            
            $mUser = DB::table('users')
                            ->select('id')
                            ->where('internal_url',$oUser->sub)
                            ->first();
            
            
            
            $oProductRequest = new ProductRequest();
            
            $oValidatedData = Validator::make(
                $aParamsArray,
                $oProductRequest->rules(),
                $oProductRequest->messages()
            );

            if ($oValidatedData->passes()) {
                
                $mCategory = DB::table('category')->select('id')
                                    ->where('internal_url',$aParams->category_id)
                                    ->first();
                
                $oProduct = new Product();
                $oProduct->users_id = (int)$mUser->id;
                $oProduct->name = $aParams->name;
                $oProduct->description = $aParams->description;
                $oProduct->brand = $aParams->brand;
                $oProduct->price = $aParams->price;
                $oProduct->discount = $aParams->discount;
                $oProduct->stock = $aParams->stock;
                $oProduct->delete = 1;
                $oProduct->size = $aParams->size;
                $oProduct->code = $aParams->code;
                $oProduct->category_id = $mCategory->id;
                $oProduct->internal_url = md5(uniqid(rand(), true));
               
                if($oProduct->save()){
                    $aData = [
                        'status' => 'success',
                        'type'   => 'payload',
                        'code'   => 200,
                        'msn'    => 'Producto registrado con exito',
                        'payload' => null
                    ];
                }else{
                    $aData = [
                        'status'  => 'error',
                        'type'    => 'nosave',
                        'code'   => 200,
                        'msn'     => 'Error al registrar producto',
                        'payload' => null
                    ];
                }

            }else{

                $aData = [
                    'status'  => 'error',
                    'type'    => 'validation',
                    'code'   => 200,
                    'msn'     => 'Un error a ocurrido al enviar los datos',
                    'payload' => $oValidatedData->errors()
                ];

            }
        }else{
            $aData = [
                'status' => 'error',
                'type'   => 'nologin',
                'code'   => 300,
                'msn'    => 'Debe de loguear para registrar la producto',
                'payload' => null
            ];
        }

        return response()->json($aData,200);
    }

    public function deleteProduct(Request $request){
        $hash = $request->header('Authorization',null);
            
        if($this->oToken->checkToken($hash)){

            $aJson = $request->input('json',null);

            $aParams  = $this->oInput->processResquest($aJson)['aParams'];
            $aParamsArray = $this->oInput->processResquest($aJson)['aParamsArray'];
            
            
            $mProduct = DB::table('products')
                            ->select('delete')
                            ->where('internal_url',$aParams->id_product)
                            ->first();
            
            $auxAct=null;
            if((int)$mProduct->delete === 0){
                $auxAct = 1;
            }else{
                $auxAct = 0;
            }
            
            if(Product::where('internal_url',$aParams->id_product)
                        ->update(['delete' => $auxAct ])){
                $aData = [
                    'status' => 'success',
                    'type'   => 'payload',
                    'code'   => 200,
                    'msn'    => 'El carro fue registrado con exito',
                    'payload' => null
                ];
            }else{
                $aData = [
                    'status' => 'error',
                    'type'   => 'updateerror',
                    'code'   => 200,
                    'msn'    => 'No se realizaron cambios',
                    'payload' => null
                ];
            }
            
        }else{
            $aData = [
                'status' => 'error',
                'type'   => 'nologin',
                'code'   => 300,
                'msn'    => 'Debe de loguear para registrar la categoria',
                'payload' => null
            ];
        }

        return response()->json($aData,200);
    }
    
    public function update($id,Request $request){
        $hash = $request->header('Authorization',null);

        $aData = [];
        if($this->oToken->checkToken($hash)){
            $aUser = $this->oToken->checkToken($hash,true);

            $aJson = $request->input('json',null);

            $aParams  = $this->oInput->processResquest($aJson)['aParams'];
            $aParamsArray = $this->oInput->processResquest($aJson)['aParamsArray'];
            
            $product_id = DB::table('products')
                                ->select('id')
                                ->where('internal_url',$id)
                                ->first();
      
            $oValidatedData = Validator::make(
                $aParamsArray,
                [
                    'name'        => 'required|min:3|max:50|unique:products,name,'.$product_id->id,
                    'description' => 'required|max:100',
                    'brand'       => 'required',
                    'price'       => 'required|numeric|min:5000|max:150000',
                    'discount'    => 'required|numeric|min:0|max:100',
                    'stock'       => 'required|numeric|min:10|max:100000',
                    'size'        => 'required|min:1|max:50',
                    'code'        => 'required|min:1|max:50|unique:products,code,'.$product_id->id,
                    'category_id' => 'required|exists:category,id'
                ],    
                [
                    'name.required'  => 'El nombre de la categoria es requerido',
                    'name.unique'    => 'El nombre de la categoria ya fue registrado',
                    'name.min'       => 'Solo se permiten 3 caracteres como minimo',
                    'name.max'       => 'Solo se permiten 50 caracteres como maximo',
                    'description.required'  => 'La descripción es requerida',
                    'description.max'       => 'Solo se permiten 100 caracteres como maximo',
                    'brand.required'         => 'La Marca es reuqrida',
                    'price.required'  => 'El precio es requerido',
                    'price.numeric'   => 'El precio debe ser numerico',
                    'price.min'       => 'El presio es minimo de 5000 pesos',
                    'price.max'       => 'El presio es de maximo 150000 pesos',
                    'discount.required'  => 'El descuento es requerido',
                    'discount.numeric'   => 'El descuento debe ser numerico',
                    'discount.min'       => 'El descuento es minimo de 0 porciento',
                    'discount.max'       => 'El descuento es minimo de 100 porciento',
                    'stock.required'  => 'La cantidad de unidades del producto es requerid',
                    'stock.numeric'   => 'La cantidad debe ser numerica',
                    'stock.min'       => 'La cantidad es minimo es de 10 unidades',
                    'stock.max'       => 'La cantidad es maximo de 100000 unidades',
                    'size.required'  => 'El tamaño es requerido',
                    'size.string'    => 'El tamaño debe ser texto no numerico',
                    'size.min'       => 'El tamaño debe ser de 1 caracteres como minimo',
                    'size.max'       => 'El tamaño debe ser de 50 caracteres como maximo',
                    'code.required' => 'El codigo es requerido',
                    'code.min'      => 'Solo se permiten 1 caracteres como minimo',
                    'code.max'      => 'Solo se permiten 20 caracteres como maximo',
                    'code.unique'   => 'El codigo ya fue registrado',
                    'category_id.required' => 'La categoria es requerida',
                    'category_id.exists' => 'La categoria debe de existir',
                ]
            );

            if ($oValidatedData->passes()) {
                
                if(Product::where('id',$product_id->id)->update($aParamsArray)){
                    $aData = [
                        'status' => 'success',
                        'type'   => 'payload',
                        'code'   => 200,
                        'msn'    => 'El carro fue registrado con exito',
                        'payload' => DB::table('products')
                                        ->where('internal_url',$id)->get()
                    ];
                }else{
                    $aData = [
                        'status' => 'error',
                        'type'   => 'updateerror',
                        'code'   => 200,
                        'msn'    => 'No se realizaron cambios',
                        'payload' => null
                    ];
                }


            }else{

                $aData = [
                    'status'  => 'error',
                    'type'    => 'validation',
                    'code'   => 200,
                    'msn'     => 'Un error a ocurrido al enviar los datos',
                    'payload' => $oValidatedData->errors()
                ];

            }

        }else{
            $aData = [
                'status' => 'error',
                'type'   => 'nologin',
                'code'   => 300,
                'msn'    => 'Debe de loguear para registrar el carro',
                'payload' => null
            ];
        }

        return response()->json($aData,200);

    }
    
     public function show($id,Request $request){
        $hash = $request->header('Authorization',null);
      
        if($this->oToken->checkToken($hash)){
            $aProduct = (array)DB::table('products')
                        ->where('internal_url',$id)->first();
            
            $iCountCar = count($aProduct);   
            if($iCountCar > 0){
                return response()->json([
                    'payload'   => $aProduct,
                    'status' => 'success',
                    'type'   => 'payload',
                    'code'   => 200
                ],200);
            }else{
                return response()->json([
                    'payload'   => null,
                    'status' => 'error',
                    'type'   => 'payload',
                    'code'   => 200
                ],200);
            }         
            
        }
       
    }
}