<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';
    protected $with = ['user','category'];
    protected $hidden = [
        'id'
    ];
    
    public function user()
    {
        return $this->belongsTo('App\User', 'users_id');
    }
    
    public function category()
    {
        return $this->belongsTo('App\Category', 'category_id');
    }
    
}

