<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use DB;
use Firebase\JWT\JWT;
use Validator;
use App\Http\Controllers\InputController;
use App\Http\Requests\UserRequest;
use App\Helpers\JwtAuth;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\CheckTokenController;

class UserController extends Controller
{
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
            
            $oUser = $this->oToken->checkToken($aParams->token,true);
            $aUserAll = User::all();
            
            if($oUser->role === 1){
               return [
                    'status' => 'success',
                    'type'   => 'payload',
                    'payload' => $aUserAll
                 ]; 
            }else{
                return [
                    'status' => 'error',
                    'type'   => 'payload',
                    'payload' => $aUserAll
                 ];
            }
            
        }
    }
    
    public function deleteUser(Request $request){
        $hash = $request->header('Authorization',null);
            
        if($this->oToken->checkToken($hash)){

            $aJson = $request->input('json',null);

            $aParams  = $this->oInput->processResquest($aJson)['aParams'];
            $aParamsArray = $this->oInput->processResquest($aJson)['aParamsArray'];
            
            
            $mUser = DB::table('users')
                            ->select('delete')
                            ->where('internal_url',$aParams->id_user)
                            ->first();
            
            $auxAct=null;
            if((int)$mUser->delete === 0){
                $auxAct = 1;
            }else{
                $auxAct = 0;
            }
            
            if(User::where('internal_url',$aParams->id_user)
                        ->update(['delete' => $auxAct ])){
                $aData = [
                    'status' => 'success',
                    'type'   => 'payload',
                    'code'   => 200,
                    'msn'    => 'El usuario fue registrado con exito',
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
    
    
    public function register(Request $request){
        $this->oInput = new InputController();
        $aJson = $request->input('json',null);
        $aParams  = $this->oInput->processResquest($aJson)['aParams'];
        $aParamsArray = $this->oInput->processResquest($aJson)['aParamsArray'];
        
        $oUserRequest = new UserRequest();

        //var_dump($oUserRequest->messages());exit();

       $oValidatedData = Validator::make(
           $aParamsArray,
            $oUserRequest->rules(),
            $oUserRequest->messages()
        );

        $aData = [];
        if ($oValidatedData->passes()) {

            $oUser = new User();
            $oUser->email =  $aParams->email;
            $oUser->password = bcrypt($aParams->password);
            $oUser->username = $aParams->username;
            $oUser->name = $aParams->name;
            $oUser->internal_url = md5(uniqid(rand(), true));
            $oUser->delete = 0;
            $oUser->lastname = $aParams->lastname;
            $oUser->phone = $aParams->phone;
            $oUser->identification = $aParams->identification;
            $oUser->address = $aParams->address;
            $oUser->roles_id = 2;

            if($oUser->save()){
                
                $aData = [
                    'status' => 'success',
                    'type'   => 'payload',
                    'code'   => 200,
                    'msn'    => 'El usuario fue registrado con exito'
                ];
            }else{

                $aData = [
                        'status'  => 'error',
                        'type'    => 'nosave',
                        'code'   => 200,
                        'msn'     => 'El usuario fue registrado con exito',
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
        return response()->json($aData,200);
   }

    public function isAuthUserRoutingAdmin(Request $request){
        $oJwtAuth = new JwtAuth();
        $aJson = $request->input('json',null);
        $this->oInput = new InputController();       
        $aParams  = $this->oInput->processResquest($aJson)['aParams'];
        //$aParamsArray = $this->oInput->processResquest($aJson)['aParamsArray'];
        $aData = [];
        
        $oJwtAuth = new JwtAuth();
        
        if($oJwtAuth->checkIdentity($aParams->token)){
            $mDecode = JWT::decode($aParams->token,$oJwtAuth->sKey,['HS256']);
            if($mDecode->role === 1){
               return response()->json(true,200);
            }
        }
        return response()->json(false,200);
    }

    public function login(Request $request){
        $oJwtAuth = new JwtAuth();

        $aJson = $request->input('json',null);

      
        $this->oInput = new InputController();
       
        $aParams  = $this->oInput->processResquest($aJson)['aParams'];
        $aParamsArray = $this->oInput->processResquest($aJson)['aParamsArray'];

        $oLoginRequest = new LoginRequest();
       

        $oValidatedData = Validator::make(
            $aParamsArray,
            $oLoginRequest->rules(),
            $oLoginRequest->messages()
        );

        $aData = [];
        if ($oValidatedData->passes()) {
         
            if(isset($aParams->gettoken)){

                $aSignup =[
                        'status'  => 'success',
                        'code'   => 200,
                        'payload' => [
                            'token' => $oJwtAuth->signup($aParams->email,$aParams->password,$aParams->gettoken)
                        ]
                    ];
           
            }else{

                $aSignup = [
                    'status'  => 'success',
                    'code'   => 200,
                    'payload' => [
                        'token' => $oJwtAuth->signup($aParams->email,$aParams->password)
                    ]
                ];
        
            }

        }else{
            $aSignup =  [
                'status'  => 'error',
                'code'   => 200,
                'msn'     => 'Email o contraseña invalida',
                'payload' => $oValidatedData->errors()
            ];
        }

       
        return response()->json($aSignup,200);


    }
}
