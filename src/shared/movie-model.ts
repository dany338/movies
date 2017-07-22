import { DateTime } from 'ionic-angular';
export class MovieModel {
  constructor(
    public vote_count:number,
    public id:number,
    public video:boolean,
    public vote_average:number,
    public title:string,
    public popularity:number,
    public poster_path:string,
    public original_language:string,
    public original_title:string,
    //public genre_ids:Array<number>,
    public backdrop_path:string,
    public adult:boolean,
    public overview:string,
    public release_date:DateTime
  ){}
  //https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher
  static fromJson(data:any) {
    console.log('entro fromJson',data);
    if(!data.id)
      throw(new Error("Invalid argument: argument structure db not macth with model"));
    return new MovieModel(
      data.vote_count,
      data.id,
      data.video,
      data.vote_average,
      data.title,
      data.popularity,
      data.poster_path,
      data.original_language,
      data.original_title,
      //data.genre_ids,
      data.backdrop_path,
      data.adult,
      data.overview,
      data.release_date
    );
  }
}
