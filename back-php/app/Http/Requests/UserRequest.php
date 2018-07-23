<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
   /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email'    => 'required|email|unique:users,email|confirmed|max:55',
            'email_confirmation' => 'required|max:55',
            'name'     => 'required|min:3|max:150',
            'username' => 'required|min:3|unique:users,username|max:150',
            'password' => 'required|min:10|max:25|confirmed',
            'address'  => 'required',
            'password_confirmation' => 'required|min:10|max:25',
            'identification' => 'required|numeric|min:100000|max:9999999999',
            'lastname' => 'required',
            'phone' => 'required|numeric|min:2000000|max:3999999999',
        ];
    }

    public function messages()
    {
        return [
            'email.required'    => 'El email es requerido',
            'email.email'    => 'El email es invalido',
            'email.unique'    => 'El email ya fue registrado',
            'email.confirmed'  => 'La confirmacion del email es erronea',
            'email.max'  => 'Solo se permiten 55 caracteres como maximo',
            'email_confirmation.required' => 'La confirmacion de email es requerida',
            'email_confirmation.max' => 'Solo se permiten 55 caracteres como maximo',
            'name.required'     => 'El nombre es requerido',
            'name.min'     => 'El nombr es de minimo 3 caracteres',
            'name.max'     => 'El nombre es de maximo 150 caracteres',
            'name.alpha_num'     => 'El nombre es alfa-numerico',
            'username.required' => 'El username es requerido',
            'username.min' => 'El username es de minimo 3 caracteres',
            'username.unique' => 'El username ya fue registrado',
            'username.max' => 'El username es de maximo 150 caracteres',
            'password.required' => 'El password es requerido',
            'password.min' => 'El password es minimo de 10 caracteres',
            'password.max' => 'El password es maximo de 25 caracteres',
            'password.confirmed' => 'La confirmacion del password es erronea',
            'address.required' => 'La direccion es requerida',
            'password_confirmation.required' => 'La confirmacion de la contraseña es requerida',
            'password_confirmation.min' => 'La confirmacion del password es minimo de 10 caracteres',
            'password_confirmation.max' => 'La confirmacion del password es maximo de 25 caracteres',
            'identification.required' => 'La cedula es requerida',
            'identification.numeric' => 'La cedula debe ser numerica',
            'identification.min' => 'El valor minimo de la cedula es 100000',
            'identification.max' => 'El valor maximo de la cedula es 9999999999',
            'lastname.required' => 'Los apellidos son requeridos',
            'phone.required' => 'El telefono es requerida',
            'phone.numeric' => 'El telefono debe ser numerica',
            'phone.min' => 'El valor minimo del telefono es 2000000',
            'phone.max' => 'El valor maximo del telefono es 3999999999',
        ];

    }
}
