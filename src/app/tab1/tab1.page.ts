import { CommonModule } from '@angular/common'
import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
  IonInput, IonButton,
  IonLabel, IonList, IonItem
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Data } from '../interfaces/data';
import { ProviderService } from '../services/provider.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,
    ExploreContainerComponent, CommonModule,
    IonLabel, IonList, IonItem,
    IonInput, IonButton,
    IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
    ReactiveFormsModule,
  ],
  // providers: [ProviderService],
})
export class Tab1Page {

  public data: Data[] = [];

  checkoutForm = this.formBuilder.group({
    texto: ''
  });

  constructor(private dataProvider: ProviderService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.dataProvider.getResponse().subscribe(response => {
      if (response != null) {
        this.data = Object.values(response) as Data[]
        console.log(this.data)
      }

    })
  }

  onSubmit(): void {
    this.dataProvider.postResponse(this.checkoutForm.value).subscribe((response) => {
      this.checkoutForm.reset();
      this.loadData()
    })
  }

}
