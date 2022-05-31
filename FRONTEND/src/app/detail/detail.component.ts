import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { map, Observable } from 'rxjs';
import { Pizza } from 'shared/models/Pizza';
import { CatalogueService } from '../catalogue.service';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  id: number;
  constructor(private route: ActivatedRoute, private catalogueService: CatalogueService, public storeService: StoreService) { }
  pizzaDetail$: Observable<Pizza[]>

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      this.pizzaDetail$ = this.catalogueService.getCatalogue()
        .pipe(
          map(pizzas => pizzas.filter((v, idx) => idx == this.id)
          ))
    })
  }
}
