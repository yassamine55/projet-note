<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Note;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Champs autorisés pour l'insertion (IMPORTANT pour register)
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * Champs cachés (sécurité API)
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Casts des attributs
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed', // Laravel hash automatique
        ];
    }

    /**
     * Relation : un user a plusieurs notes
     */
    public function notes()
    {
        return $this->hasMany(Note::class);
    }
}