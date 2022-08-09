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
  imgname = 'Choose file';
  image?: File;

  @ViewChild('img_n') img_n!: ElementRef;
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
      image: new FormControl(),
    });
  }

  @ViewChild('fileInput') fileInput!: ElementRef;
  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.image = <File>imgFile.target.files[0];
      this.imgname = imgFile.target.files[0].name;
      this.addRoomForm.get('image')?.setValue(this.image);
    }
  }

  addRoom(): void {
    const img = this.addRoomForm.value.pictureUrls == "Choose file" ? [] : this.addRoomForm.value.pictureUrls;

    const roomFormData = new FormData();
    roomFormData.append('building', this.addRoomForm.value.building);
    roomFormData.append('roomNumber', this.addRoomForm.value.roomNumber);
    roomFormData.append('isAccessible', this.addRoomForm.value.isAccessible);
    roomFormData.append('maxOccupancy', this.addRoomForm.value.maxOccupancy);
    roomFormData.append('floor', this.addRoomForm.value.floor);
    roomFormData.append('roomType', this.addRoomForm.value.roomType);
    roomFormData.append('pricePerNight', this.addRoomForm.value.pricePerNight);
    roomFormData.append('image', this.addRoomForm.get('image')?.value, this.imgname);

    this.roomService.addRoom(roomFormData)
      .subscribe(
        {
          next: (response: any) => {
            this.openSnackBar(response.message, 'Close');
            this.resetForm();
            this.router.navigate(['/', 'dashboard', 'room']);
          },
          error: (err) => {
            this.fileInput.nativeElement.value = '';
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

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/', 'login']);
  }

  ngOnInit(): void {
  }

}
