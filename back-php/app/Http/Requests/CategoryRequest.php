<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
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
            'name'        => 'required|unique:category,name|max:55',
            'description' => 'required|max:100'
        ];
    }

    public function messages()
    {
        return [
            'name.required'  => 'El nombre de la categoria es requerido',
            'name.unique'    => 'El nombre de la categoria ya fue registrado',
            'name.max'       => 'Solo se permiten 55 caracteres como maximo',
            'description.required'  => 'La descripción es requerida',
            'description.max'       => 'Solo se permiten 100 caracteres como maximo',
        ];

    }
}
