import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['../booking.component.css']
})

export class AddBookingComponent implements OnInit {
  bookForm!: FormGroup;

  constructor(private userService: UserService, private router: Router) { }

  tiles: Tile[] = [
    { text: '20 Booked', cols: 1, rows: 1, color: '#8aa771' },
    { text: '20 Available', cols: 1, rows: 1, color: '#fcb806' },
    { text: '10 CheckIns', cols: 1, rows: 1, color: '#818283' },
    { text: '4 CheckOuts', cols: 1, rows: 1, color: '#647754' },
  ];

  ngOnInit(): void {
  }

  addBook(): void {
    console.log("hello world")
  }

  logout(): void{
    this.userService.logout();
    this.router.navigate(['/', 'login']);
  }


}
