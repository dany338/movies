import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import { MovieModel } from './movie-model';
import { AppSettings } from './app-settings';

@Injectable()
export class MoviesService {

  public movies:MovieModel[] = [];
  public searchIni:string = 'Jack+Reacher';
  constructor(public http: Http, public storage: Storage) {
    console.log('Hello MoviesService Provider');
    this.getMovies(this.searchIni);
  }

  public getMovies(search:string) {
    this.getFromLocal(search)
    .then(()=> { this.getFromServer(search) },
          ()=> { this.getFromServer(search) });
  }

  private getFromLocal(search:string) {
    return this.storage.ready().then(() => {
      return this.storage.get('movies').then((data)=> {
        let storageLists:MovieModel[] = [];
        if(data) {
          for(let list of data){
            storageLists.push(new MovieModel(
                list.vote_count,
                list.id,
                list.video,
                list.vote_average,
                list.title,
                list.popularity,
                list.poster_path,
                list.original_language,
                list.original_title,
                //list.genre_ids,
                list.backdrop_path,
                list.adult,
                list.overview,
                list.release_date
              )
            );
          }
        }
        this.movies = storageLists;
      });
    });
  }

  private getFromServer(search:string) {
    this.http.get(`${AppSettings.API_ENDPOINT}`+search) //temporal string
    .map(response => { return response.json() })
    .map((lists:any) => {
      return lists.results.map(item => MovieModel.fromJson(item));
    })
    .subscribe(
      (result:MovieModel[]) => {
        console.log("entro en suscribe",result);
        this.movies = result;
        this.saveLocally();
      },
      error => {
        console.log("Error loading lists from server", error);
      }
    );
  }

  public saveLocally() {
    this.storage.set('movies',JSON.stringify(this.movies));
  }

}
