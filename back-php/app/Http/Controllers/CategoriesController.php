<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Validator;
use App\Http\Controllers\InputController;
use App\Helpers\JwtAuth;
use App\Http\Controllers\CheckTokenController;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\CategoryRequest;
use Illuminate\Support\Facades\DB;
use App\Category;

class CategoriesController extends Controller
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
            $aCategoryAll = Category::all();
           
            return [
                'status' => 'success',
                'type'   => 'payload',
                'payload' => $aCategoryAll
            ];
        }
    }
    
    public function addCategory(Request $request){
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
        
            $oCategoryRequest = new CategoryRequest();
            $oValidatedData = Validator::make(
                $aParamsArray,
                $oCategoryRequest->rules(),
                $oCategoryRequest->messages()
            );

            if ($oValidatedData->passes()) {

                $oCategory = new Category();
                $oCategory->users_id = $mUser->id;
                $oCategory->name = $aParams->name;
                $oCategory->description = $aParams->description;
                $oCategory->internal_url = md5(uniqid(rand(), true));
               
                if($oCategory->save()){
                    $aData = [
                        'status' => 'success',
                        'type'   => 'payload',
                        'code'   => 200,
                        'msn'    => 'Categoria registrada con exito',
                        'payload' => null
                    ];
                }else{
                    $aData = [
                        'status'  => 'error',
                        'type'    => 'nosave',
                        'code'   => 200,
                        'msn'     => 'Error al registrar categoria',
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
                'msn'    => 'Debe de loguear para registrar la categoria',
                'payload' => null
            ];
        }

        return response()->json($aData,200);
    }

    public function deleteCategory(Request $request){
        $hash = $request->header('Authorization',null);
            
        if($this->oToken->checkToken($hash)){

            $aJson = $request->input('json',null);

            $aParams  = $this->oInput->processResquest($aJson)['aParams'];
            $aParamsArray = $this->oInput->processResquest($aJson)['aParamsArray'];
            
            
            $mCategory = DB::table('category')
                            ->select('delete')
                            ->where('internal_url',$aParams->id_category)
                            ->first();
            
            $auxAct=null;
            if((int)$mCategory->delete === 0){
                $auxAct = 1;
            }else{
                $auxAct = 0;
            }
            
            if(Category::where('internal_url',$aParams->id_category)
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
            
            $category_id = DB::table('category')
                                ->select('id')
                                ->where('internal_url',$id)
                                ->first();
      
            $oValidatedData = Validator::make(
                $aParamsArray,
                [
                    'name'        => 'required|max:55|unique:category,name,'.$category_id->id,
                    'description' => 'required|max:100'
                ],
                [
                    'name.required'  => 'El nombre de la categoria es requerido',
                    'name.unique'    => 'El nombre de la categoria ya fue registrado',
                    'name.max'       => 'Solo se permiten 55 caracteres como maximo',
                    'description.required'  => 'La descripción es requerida',
                    'description.max'       => 'Solo se permiten 100 caracteres como maximo',
                ]
            );

            if ($oValidatedData->passes()) {

                if(Category::where('internal_url',$id)->update($aParamsArray)){
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
            $aCategory = (array)DB::table('category')
                        ->select('name','description')
                        ->where('internal_url',$id)->first();
            
            $iCountCar = count($aCategory);   
            if($iCountCar > 0){
                return response()->json([
                    'payload'   => $aCategory,
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