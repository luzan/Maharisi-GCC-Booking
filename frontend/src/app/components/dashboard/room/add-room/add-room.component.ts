import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['../../dashboard.component.css']
})
export class AddRoomComponent implements OnInit {
  addRoomForm!: FormGroup;

  constructor(private fb: FormBuilder, 
    private userService: UserService,
    private router: Router) {
      
      this.addRoomForm = this.fb.group({
        buildingNumber: new FormControl(),
        roomNumber: new FormControl(), 
        isAccessible: new FormControl(), 
        maxOccupancy: new FormControl(),
        floor: new FormControl(),
        selectImage: new FormControl()
      })
  }

  @ViewChild('fileInput')
  fileInput!: ElementRef;
  selectImage = 'Choose File';
  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.selectImage = '';
      Array.from(imgFile.target.files).forEach((file: any) => {
        this.selectImage += file.name + ' - ';
      });
      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = () => {
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = '';
    } else {
      this.selectImage = 'Choose File';
    }
  }

  addRoom(): void{}
    
  logout(): void{
    this.userService.logout();
    this.router.navigate(['/', 'login']);
  }

  ngOnInit(): void {
  }

}
