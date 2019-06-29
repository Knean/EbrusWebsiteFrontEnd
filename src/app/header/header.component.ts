import { Component, OnInit } from '@angular/core';
import { DropdownDirective } from '../dropdown.directive';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
public show=false
public navShow = false
dropdown(){
  this.show = !this.show
}
displayNav(){
  this.navShow = !this.navShow
}
searchForm: FormGroup
  constructor(private router: Router) { }
onSubmit(){
  /* console.log(this.searchForm.get('query').value) */
  this.router.navigate(['products'],{queryParams: {'search': this.searchForm.get('query').value}})
}
  ngOnInit() {
    this.searchForm = new FormGroup(
      {'query':new FormControl('', Validators.required)}
    )
  }

}
