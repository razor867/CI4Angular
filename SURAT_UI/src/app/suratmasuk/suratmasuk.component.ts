import { Component, OnInit } from '@angular/core';
import { Suratmasuk } from '../_model/Suratmasuk';
import { SuratMasukService } from '../_service/surat-masuk.service';

@Component({
  selector: 'app-suratmasuk',
  templateUrl: './suratmasuk.component.html',
  styleUrls: ['./suratmasuk.component.css']
})
export class SuratmasukComponent implements OnInit {
  displayedColumns: string[] = ['title', 'regarding', 'to_person', 'from_person'];
  listSuratMasuk: Suratmasuk[] = [];

  constructor(
    private suratMasukSvc: SuratMasukService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.suratMasukSvc.findAll().subscribe((res: Suratmasuk[] | null) => {
      if (res) {
        this.listSuratMasuk = res;
        console.log(this.listSuratMasuk);
      }
    })
  }

}
