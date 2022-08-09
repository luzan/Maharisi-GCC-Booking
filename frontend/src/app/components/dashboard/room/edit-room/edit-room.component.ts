import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RoomService } from '../../../../services/room/room.service';
import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['../../dashboard.component.css']
})
export class EditRoomComponent implements OnInit {
  editRoomForm!: FormGroup;

  imgname = 'Choose file';
  @ViewChild('img_n') img_n!: ElementRef;
  constructor(private fb: FormBuilder,
    private userService: UserService,
    private roomService: RoomService,
    private router: Router,
    private snackBar: MatSnackBar) {

    this.editRoomForm = this.fb.group({
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

      this.imgname = '';
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

  editRoom(): void {
    const img = this.editRoomForm.value.pictureUrls == "Choose file" ? [] : this.editRoomForm.value.pictureUrls;
    // console.log("--this.editRoomForm.value--", this.editRoomForm.value);
    const roomData = {
      building: this.editRoomForm.value.building,
      roomNumber: this.editRoomForm.value.roomNumber,
      isAccessible: this.editRoomForm.value.isAccessible,
      maxOccupancy: this.editRoomForm.value.maxOccupancy,
      floor: this.editRoomForm.value.floor,
      roomType: this.editRoomForm.value.roomType,
      pictureUrls: img,
      pricePerNight: this.editRoomForm.value.pricePerNight
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
    this.editRoomForm.reset();
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
