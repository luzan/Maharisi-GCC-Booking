import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


import { RoomService } from '../../../../services/room/room.service';
import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['../../dashboard.component.css']
})
export class AddRoomComponent implements OnInit {
  addRoomForm!: FormGroup;

  imgname='Choose file';
  @ViewChild('img_n') img_n!:ElementRef; 
  constructor(private fb: FormBuilder, 
    private userService: UserService,
    private roomService: RoomService,
    private router: Router,
    private snackBar: MatSnackBar) {
      
      this.addRoomForm = this.fb.group({
        building: new FormControl(),
        roomNumber: new FormControl(), 
        isAccessible: new FormControl(), 
        maxOccupancy: new FormControl(),
        floor: new FormControl(),
        roomType: new FormControl(),
        pictureUrls: new FormControl("Choose file"),
        pricePerNight: new FormControl(),
      });
  }

  @ViewChild('fileInput') fileInput!: ElementRef;
  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
     
   this.imgname='';
      Array.from(imgFile.target.files).forEach((file: any) => {
        this.imgname += file.name + ' - ';
      });

      this.img_n.nativeElement.value = this.imgname;
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
      this.imgname = 'Choose File';
    }
  }

  addRoom(): void {
    const img = this.addRoomForm.value.pictureUrls == "Choose file" ? [] : this.addRoomForm.value.pictureUrls;
    // console.log("--this.addRoomForm.value--", this.addRoomForm.value);
    const roomData = {
      building: this.addRoomForm.value.building,
      roomNumber: this.addRoomForm.value.roomNumber,
      isAccessible: this.addRoomForm.value.isAccessible, 
      maxOccupancy: this.addRoomForm.value.maxOccupancy,
      floor: this.addRoomForm.value.floor,
      roomType: this.addRoomForm.value.roomType,
      pictureUrls: img,
      pricePerNight: this.addRoomForm.value.pricePerNight
    }
    this.roomService.addRoom(roomData)
      .subscribe(
        {
          next: (response: any) => {
            this.openSnackBar(response.message, 'Close');
            this.resetForm();
          },
          error: (err) => {
            this.openSnackBar(err.error.message, 'Close');
            console.log(err);
          }
        }
      );
  }

  resetForm(): void {
    this.addRoomForm.reset();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
    
  logout(): void{
    this.userService.logout();
    this.router.navigate(['/', 'login']);
  }

  ngOnInit(): void {
  }

}
