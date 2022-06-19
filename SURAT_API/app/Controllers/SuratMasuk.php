<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\SuratMasukModel;

class SuratMasuk extends ResourceController
{
    use ResponseTrait;

    public function index()
    {
        $model = new SuratMasukModel();
        $data = $model->findAll();
        return $this->respond($data, 200);
    }

    public function show($id = null)
    {
        $model = new SuratMasukModel();
        $data = $model->getWhere(['id' => $id])->getResult();
        if ($data) {
            return $this->respond($data);
        } else {
            return $this->failNotFound('No Data Found with id ' . $id);
        }
    }

    public function create()
    {
        $model = new SuratMasukModel();
        $data = [
            'title' => $this->request->getPost('title'),
            'regarding' => $this->request->getPost('regarding'),
            'to_person' => $this->request->getPost('to_person'),
            'from_person' => $this->request->getPost('from_person'),
            'message' => $this->request->getPost('message')
        ];
        $data = json_decode(file_get_contents("php://input"));
        $model->insert($data);
        $response = [
            'status'    => 201,
            'error'     => null,
            'messages'  => [
                'success' => 'Data Saved'
            ]
        ];

        // return $this->respondCreated($data, 201);
        return $this->respond($response);
    }

    public function update($id = null)
    {
        $model = new SuratMasukModel();
        $json = $this->request->getJSON();
        if ($json) {
            $data = [
                'title' => $json->title,
                'regarding' => $json->regarding,
                'to_person' => $json->to_person,
                'from_person' => $json->from_person,
                'message' => $json->message
            ];
        } else {
            $input = $this->request->getRawInput();
            $data = [
                'title' => $input->title,
                'regarding' => $input->regarding,
                'to_person' => $input->to_person,
                'from_person' => $input->from_person,
                'message' => $input->message
            ];
        }

        $model->update($id, $data);
        $response = [
            'status'    => 200,
            'error'     => null,
            'messages'  => [
                'success' => 'Data Updated'
            ]
        ];
        return $this->respond($response);
    }

    public function delete($id = null)
    {
        $model = new SuratMasukModel();
        $data = $model->find($id);
        if ($data) {
            $model->delete($id);
            $response = [
                'status'    => 200,
                'error'     => null,
                'messages'  => [
                    'success' => 'Data Deleted'
                ]
            ];

            return $this->respondDeleted($response);
        } else {
            return $this->failNotFound('No Data Found with id ' . $id);
        }
    }

    public function judul($id = null)
    {
        $model = new SuratMasukModel();
        $data = $model->find($id);

        return $this->respond($data);
    }
}
