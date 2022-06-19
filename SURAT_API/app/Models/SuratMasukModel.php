<?php

namespace App\Models;

use CodeIgniter\Model;

class SuratMasukModel extends Model
{
    protected $table = 'surat_masuk';
    protected $primaryKey = 'id';
    protected $allowedFields = ['title', 'regarding', 'to_person', 'from_person', 'message'];
}
