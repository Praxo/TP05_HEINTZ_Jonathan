import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/store.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {
  constructor(public storeService: StoreService) { }

  ngOnInit(): void {
  }
}