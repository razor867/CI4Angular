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
  displayedColumns: string[] = ['title', 'regarding', 'to_person', 'from_person'];
  listSuratMasuk: Suratmasuk[] = [];
  pageInit = true;
  pageForm = false;
  titleForm = "";
  formSuratMasuk!: FormGroup;

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
      to: ['', Validators.required],
      from: ['', Validators.required],
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

  add(type: string) {
    this.pageInit = false;
    this.pageForm = true;
    if (type == "I") {
      //add
      this.titleForm = "Add Surat Masuk";
    } else {
      //update
      this.titleForm = "Edit Surat Masuk";
    }
  }

  submit(type: string) {
    if (this.formSuratMasuk.invalid) {
      this.ui.validateFormEntry(this.formSuratMasuk);
      return;
    }
    if (type == "I") {

    } else {

    }
  }

  backForm() {
    this.pageForm = false;
    this.pageInit = true;
  }

}
