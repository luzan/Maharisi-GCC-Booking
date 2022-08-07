### BackEnd

#### Models
- [x] User Models
  - [x] profile information
  - [ ] roles (admin. guest)
  - [x] login information
  - [x] hash password
- [x] Rooms Models
  - [x] number, storied(2), accessible, number of occupant (1-2)
  - [x] add booking days as individual days in room
  - [ ] test booking days
    - [x] on start
    - [ ] on revised
    - [ ] on cancelled
    - [ ] on delete
    - [ ] on complete
- [x] Booking Models 
  - [x] (Payment can be a part of Booking Model)
  - [ ] room -> bring only necessary data from room models
- [x] Payment Models

#### User Controllers
- [x] User CRUD 
  - [ ] (Profile Image Upload)
- [x] User Login
  - [ ] Logout
- [ ] Booking CRUD
  - [ ] room reservation needs to be verified by admin
  - [x] once booking is made booking days needs to be stored in room
    - [ ] check if this works for revised, cancelled
- [ ] Payment CRUD
  - [ ] Update only adds necessary flag
  - [x] when payment is done, booking's Payment Flag to be changed to paid
  - [x] no delete operation on payment
- [x] Room Crud

#### Middlewares 
- [x] Login using JWT
  - [ ] Roles based authorization
- [ ] Upload Image to S3

#### Routes
- [ ] Roles based routing

### FrontEnd
- [x] User Login UI
  - [ ] Login integate with API
  - [ ] Register UI
  - [ ] Register integate with API
  - [ ] Logout
- [ ] Dashbaord
  - [ ] menu
  - [ ] booking UI CRUD
  - [ ] booking integate with API CRUD

