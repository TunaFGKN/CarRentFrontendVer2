import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  currentColor:Color | null;
  colors:Color[] = [];
  dataLoaded = false;

  constructor(private colorService:ColorService){}

  ngOnInit(): void {
    this.getColors();
  }

  getColors(){
    this.colorService.getColors().subscribe(response =>{
      this.colors = response.data;
      this.dataLoaded = true;
    })
  }

  setCurrentColor(color:Color){
    if (this.currentColor === color) { 
      this.currentColor = null;
    } else {
      this.currentColor = color;
    }
  }

  getCurrentColor(color:Color){
    if(color == this.currentColor){
      return "list-group-item active";
    }else{
      return "list-group-item"
    }
  }
}
