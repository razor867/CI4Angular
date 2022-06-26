import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Suratmasuk } from '../_model/Suratmasuk';
import { HelperService } from '../_service/helper.service';
import { SuratMasukService } from '../_service/surat-masuk.service';

@Component({
  selector: 'app-suratmasuk',
  templateUrl: './suratmasuk.component.html',
  styleUrls: ['./suratmasuk.component.css']
})
export class SuratmasukComponent implements OnInit {
  displayedColumns: string[] = ['title', 'regarding', 'to_person', 'from_person', 'action'];
  listSuratMasuk: Suratmasuk[] = [];
  pageInit = true;
  pageForm = false;
  titleForm = "";
  formSuratMasuk!: FormGroup;
  isEdit = false;
  idData = 0;

  constructor(
    private suratMasukSvc: SuratMasukService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private ui: HelperService
  ) { }

  ngOnInit() {
    this.formInit();
    this.loadData();
  }

  formInit() {
    this.formSuratMasuk = this.fb.group({
      title: ['', Validators.required],
      regarding: ['', Validators.required],
      to_person: ['', Validators.required],
      from_person: ['', Validators.required],
      message: ['',Validators.required]
    })
  }

  loadData() {
    this.suratMasukSvc.findAll().subscribe((res: Suratmasuk[] | null) => {
      if (res) {
        this.listSuratMasuk = res;
        console.log(this.listSuratMasuk);
      }
    })
  }

  add(type: string, data: Suratmasuk | null) {
    this.pageInit = false;
    this.pageForm = true;
    this.formSuratMasuk.reset();
    this.isEdit = false;

    if (type == "I") {
      //add
      this.titleForm = "Add Surat Masuk";
    } else {
      //update
      this.titleForm = "Edit Surat Masuk";
      this.isEdit = true;
      if (data) {
        this.idData = data.id;
        this.formSuratMasuk.setValue({
          title: data.title,
          regarding: data.regarding,
          to_person: data.to_person,
          from_person: data.from_person,
          message: data.message
        })
      }
    }
  }

  submit() {
    if (this.formSuratMasuk.invalid) {
      this.ui.validateFormEntry(this.formSuratMasuk);
      return;
    }

    const data = this.formSuratMasuk.getRawValue();
    data.id = this.idData;
    if (this.isEdit) {
      this.suratMasukSvc.editSuratMasuk(data)
        .subscribe({
          next: (res: any) => {
            this.pageForm = false;
            this.pageInit = true;
            this.toastr.success("Berhasil merubah data");
            this.loadData();
          },
          error: (error: any) => {

          }
        });
    } else {
      this.suratMasukSvc.addSuratMasuk(data)
        .subscribe({
          next: (res: any) => {
            this.pageForm = false;
            this.pageInit = true;
            this.toastr.success("Berhasil menambah data");
            this.loadData();
          },
          error: (error: any) => {

          }
        });
    }
  }

  backForm() {
    this.pageForm = false;
    this.pageInit = true;
  }

  del(data: Suratmasuk) {
    this.suratMasukSvc.delSuratMasuk(data)
      .subscribe({
        next: (res: any) => {
          this.pageForm = false;
          this.pageInit = true;
          this.toastr.success("Berhasil menghapus data");
          this.loadData();
        },
        error: (error: any) => {
        }
      });
  }

}
