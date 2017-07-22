import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MoviesService } from '../../shared/movies-service';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  searchQuery: string = '';
  items:any;
  constructor(public navCtrl: NavController, public moviesService:MoviesService) {
      this.initializeItems();
  }

  initializeItems() {
    //console.log('home page 2',moviesService.movies);
    //this.items = tmoviesService.movies;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.moviesService.getMovies(val);
      /*this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })*/
    }
  }

}
