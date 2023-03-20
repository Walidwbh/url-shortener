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
  @ViewChild('copy') copy!: ElementRef;
  title = 'url-shortener';
  shortUrl: any;
  myForm!:FormGroup;
  url:any;
  myUrls:any[]=[];
  myShortUrls:any[]=[];
  constructor(private shortlyService: ShortlyServiceService, private fb:FormBuilder){}
  ngOnInit():void {
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
      this.myUrls.push(this.myForm.get('url')?.value);
      this.myShortUrls.push(data.result.short_link);
    })
  }
  copyUrl(){
    navigator.clipboard.writeText(this.copy.nativeElement.previousElementSibling.innerText);
    this.copy.nativeElement.classList.add("copied");
    this.copy.nativeElement.innerText = "Copied!"
  }
}
