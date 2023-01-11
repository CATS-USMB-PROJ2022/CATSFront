import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


const globalUrl = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) {
  }

  //upload d'un fichier vers l'api
  public postFileUpload(file: File): Observable<any> {
    console.log(file);
    const fileData = new FormData();
    fileData.append('file', file);

    return this.http.post<any>(`${globalUrl}Upload`, fileData);
  }
}
