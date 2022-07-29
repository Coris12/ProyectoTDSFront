import { Component, OnInit } from '@angular/core';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-lector',
  templateUrl: './lector.component.html',
  styleUrls: ['./lector.component.css']
})
export class LectorComponent implements OnInit {
  public output: string;
 
  // @ViewChild('action', { static: true }) action: NgxScannerQrcodeComponent;
  // TODO something this.action
 
  public onError(e): void {
    alert(e);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
