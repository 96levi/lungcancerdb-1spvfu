import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/s/data.service';

@Component({
  selector: 'app-image-render',
  templateUrl: './image-render.component.html',
  styleUrls: ['./image-render.component.css']
})
export class ImageRenderComponent implements OnChanges, OnInit {
  @Input() stt: number;
  @Input() dateHos: number;
  @Input() date: number;
  @Input() folder: string;
  @Input() submitCondition: string;
  imgSrc: string;
  images = [];
  carousel: Array<string>;
  lens = false;
  myForm: FormGroup;
  formInfo: FormGroup;
  selectedImage: number;
  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      file: ['', [Validators.required]],
      fileSource: ['', [Validators.required]]
    });

    this.formInfo = this.fb.group({
      record: [Number, Validators.required],
      stt: [this.stt, Validators.required],
      dateHos: [Number, Validators.required],
      date: [Number, Validators.required],
      folder: [this.folder, Validators.required],
      image: '',
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.imgSrc = 'http://research.raisinghopevn.com/php/Dz/img/' + this.folder + '/';
    // reset carousel onChange
    this.carousel = [];

    // get data
    this.dataService.getImage('READ_IMAGE', this.stt, this.dateHos, this.date, this.folder).subscribe(
      res => {
        if (typeof res === 'string') {
          this.submitCondition = 'add';
          this.formInfo.controls.record.setValue(res);
          this.formInfo.controls.dateHos.setValue(new Date(+this.dateHos));
          this.formInfo.controls.date.setValue(new Date(+this.date));
        } else {
          if (typeof res === 'object') {
            this.submitCondition = 'view';
            this.formInfo.setValue(res);
            this.formInfo.controls.dateHos.setValue(new Date(+this.dateHos));
            this.formInfo.controls.date.setValue(new Date(+this.date));
            // Set gallery items array
            const img: string = this.formInfo.controls.image.value;
            if (img === '') {
              this.carousel = [];
            } else {
              let arr = new Array();
              arr = img.split(',');
              this.carousel = arr;
            }
          }
        }
      }
    );
  }

  get f() {
    return this.myForm.controls;
  }
  resetUploadFile(): void {
    this.images = [];
  }

  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();

        reader.onload = (event1: any) => {
          this.images.push(event1.target.result);

          this.myForm.patchValue({
            fileSource: this.images
          });
        };

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  submit() {
    this.dataService.uploadMultipleImg(this.stt, this.dateHos, this.date, this.folder, this.myForm.value).subscribe(
      res => {
        // reload carousel
        this.carousel = [...this.carousel, ...res];
        // update imageName field
        const imgName = this.carousel.toString();
        this.formInfo.controls.image.setValue(imgName);
        this.onSubmitInfo();
        this.resetUploadFile();
      }
    );
  }

  onSubmitInfo() {
    const fbData = this.formInfo.value;
    fbData.date = this.formInfo.controls.date.value.getTime(); // Locale date to BigINT
    fbData.dateHos = this.formInfo.controls.dateHos.value.getTime(); // Locale date to BigINT
    if (this.submitCondition === 'add') {
      this.dataService.submitButton('ADD', 'image', fbData);
      this.submitCondition = 'view';
    } else {
      this.dataService.submitButton('CHANGE', 'image', fbData);
    }
    //  alert('Lưu thành công');
  }

  selectImage(index: number) {
    this.selectedImage = index;
  }

  delectImage() {

    const arr: Array<string> = this.formInfo.controls.image.value.split(',');

    // delete image on server
    this.dataService.deleteFile(arr[this.selectedImage], this.folder).subscribe(
      res => console.log(res)
    );

    // update formInfo
    arr.splice(this.selectedImage, 1);
    this.formInfo.controls.image.setValue(arr.toString());
    this.onSubmitInfo();
    // reload carousel
    this.carousel = arr;

  }

  openWindow(url: string) {
    window.open(url);
  }
}
