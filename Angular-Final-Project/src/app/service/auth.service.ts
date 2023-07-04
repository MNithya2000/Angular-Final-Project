import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions:any;
  constructor(private http:HttpClient
    ) { 
      let token =sessionStorage.getItem("token")
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Authorization":  "Bearer "+token
        })
      }
    }

  apiurl='http://localhost:4500/user';

  RegisterUser(inputdata:any){
    return this.http.post(this.apiurl,inputdata)
  }
  GetUserbyCode(id:any){
    return this.http.get(this.apiurl+'/'+id);
  }
  Getall(){
    return this.http.get(this.apiurl);
  }
  updateuser(id:any,inputdata:any){
    return this.http.put(this.apiurl+'/'+id,inputdata);
  }
  getuserrole():Observable<any>{
    
    return this.http.get('http://localhost:4500/660/role',this.httpOptions);
  }
  isloggedin(){
    return sessionStorage.getItem('username')!=null;
  }
  getrole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }
  GetAllCustomer():Observable<any>{
    return this.http.get('http://localhost:4500/660/customer',this.httpOptions);
  }
  Getaccessbyrole(role:any,menu:any):Observable<any>{
    return this.http.get('http://localhost:4500/660/roleaccess?role='+role+'&menu='+menu,this.httpOptions);
  }
}
