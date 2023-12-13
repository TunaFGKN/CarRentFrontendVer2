import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImageDetail } from 'src/app/models/carImageDetail';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carDetails:CarDetail[] = [];
  carImageDetail: CarImageDetail[] = [];
  brands:Brand[] = [];
  colors:Color[] = [];
  selectedBrand: Brand | null = null;
  selectedColor: Color | null = null;
  currentCar:CarDetail | null = null;
  dataLoaded = false;
  isImageLoaded = false;
  baseImageUrl = "https://localhost:7190/uploads/images/";
  selectedCarImage: string = "";
  

  constructor(private carDetailService:CarDetailService, private route:ActivatedRoute, private carImageService: CarImageService, private httpClient:HttpClient, private brandService:BrandService, private colorService:ColorService){}

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.getBrands()
      this.getColors()
      if(params["brandId"]){
        this.getCarDetailsByBrand(params["brandId"]);
      }else if(params["colorId"]){
        this.getCarDetailsByColor(params["colorId"])
      }else if(params["carId"]){
        this.getCarDetailsByCarId(params["carId"]);
      }
      else{
        this.getCarDetails();
      }
    })
  }

  getCarDetails(){
    this.carDetailService.getCarDetails().subscribe(response =>{
      this.carDetails = response.data;
      this.dataLoaded=true;
    })
  }

  getCarDetailsByBrand(brandId:number){
    this.carDetailService.getCarDetailsByBrand(brandId).subscribe(response=>{
      this.carDetails = response.data;
      this.dataLoaded = true;
    })
  }

  getCarDetailsByColor(colorId:number){
    this.carDetailService.getCarDetailsByColor(colorId).subscribe(response=>{
      this.carDetails = response.data;
      this.dataLoaded = true;
    })
  }

  getCarDetailsByCarId(carId: number) {
    this.carImageService.getCarImagesByCarId(carId).subscribe(response => {
      this.carImageDetail = response.data;
      this.isImageLoaded = true;
    });

    this.carDetailService.getCarDetailsById(carId).subscribe(response=>{
      this.carDetails = response.data;
      this.dataLoaded = true; 
    })
  }

  getImagePath(carImageDetail:CarImageDetail){
    let imagePath = this.baseImageUrl + carImageDetail.imagePath;
    return imagePath;
  }

  setCurrentCar(carDetail:CarDetail){
    if (this.currentCar === carDetail) { 
      this.currentCar = null;
    } else {
      this.currentCar = carDetail;
    }
  }

  getCurrentCar(carDetail:CarDetail){
    if(carDetail == this.currentCar){
      return "list-group-item active";
    }else{
      return "list-group-item"
    }
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    });
  }

  setCurrentBrand(brand:Brand){
    this.selectedBrand = brand
  }

  getColors(){
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    });
  }

  setCurrentColor(color:Color){
    this.selectedColor = color
  }

  clear(){
    this.selectedBrand = null;
    this.selectedColor = null;
    
    this.getCarDetails(); 
  }
}
