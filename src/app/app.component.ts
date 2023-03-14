import { Component,OnInit, AfterViewInit, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ShortlyServiceService } from './services/shortly-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  // declare the copy button
  isCopied: boolean = false;
  title = 'url-shortener';
  shortUrl: any;
  myForm!:FormGroup;
  url:any;
  myUrls:any[]=[];
  myShortUrls:any[]=[];
  constructor(private shortlyService: ShortlyServiceService, private fb:FormBuilder){}
  ngOnInit():void {
    // this.getShortLink();
    this.validUrl()
  }
  validUrl(){
    this.myForm = this.fb.group({
      url: ['',[Validators.required,
      Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")]
      ]
  })
}
  getShortLink(){
    this.shortlyService.getShortLink(this.myForm.get('url')?.value).subscribe((data)=>{
      // console.log(data.result.short_link);
      this.myUrls.push(this.myForm.get('url')?.value);
      this.myShortUrls.push(data.result.short_link);
      console.log(this.myUrls)
      console.log(this.myShortUrls)
    })
  }
  copyUrl(event: any){
    navigator.clipboard.writeText(event.target.previousElementSibling.innerText);
    event.target.classList.add("copied");
    event.target.innerText = "Copied!"
  }
}
