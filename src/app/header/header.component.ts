import { Component, OnInit } from '@angular/core';
import { DropdownDirective } from '../dropdown.directive';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router, 
    private auth: AuthenticationService){}

  public show = false
  public navShow = false
  public profileShow = false
  public user
  dropdown() {
    this.show = !this.show
  }
  displayNav() {
    this.navShow = !this.navShow
  }
  profileClick(){
    this.profileShow = !this.profileShow
  }
  logout(){
    //this.auth.user.next('') 
    this.auth.logout()
    
    
  }
  searchForm: FormGroup
  
  onSubmit() {
    /* console.log(this.searchForm.get('query').value) */
    this.router.navigate(['products'], { queryParams: { 'search': this.searchForm.get('query').value } })
  }
  ngOnInit() {    
    this.auth.get_user()
    this.auth.user.subscribe(data=>this.user = data)
    this.searchForm = new FormGroup(
      { 'query': new FormControl('', Validators.required) }
    )
    /* this.auth.login('mario', 'majestic12').subscribe() */
    //this.auth.get_user().subscribe((data: any) => {data.user? this.user = data.user: this.user = ''})    

  }

}
