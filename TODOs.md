### BackEnd

#### Models
- [x] User Models
  - [x] profile information
  - [ ] roles (admin. guest)
  - [x] login information
  - [x] hash password
- [x] Rooms Models
  - [x] number, storied(2), accessible, number of occupant (1-2)
  - [ ] change roomType to enum
  - [x] add booking days as individual days in room
  - [ ] test booking days
    - [x] on start
    - [ ] on revised
    - [ ] on cancelled
    - [ ] on delete
    - [ ] on complete
- [x] Booking Models 
  - [x] (Payment can be a part of Booking Model)
  - [x] room -> bring only necessary data from room models
- [x] Payment Models

#### User Controllers
- [x] User CRUD 
  - [ ] (Profile Image Upload)
  - [x] Hide User password on response
- [x] User Login
  - [ ] Logout
- [x] Booking CRUD
  - [x] room reservation needs to be verified by admin
  - [x] once booking is made booking days needs to be stored in room
    - [ ] check if this works for revised, cancelled
- [ ] Payment CRUD
  - [ ] Update only adds necessary flag
  - [x] when payment is done, booking's Payment Flag to be changed to paid
  - [x] no delete operation on payment
- [x] Room Crud
  - [ ] Get Room by Room Type
- [ ] Payment
  - [x] Add user information in payment

#### Middlewares 
- [x] Login using JWT
  - [x] Roles based authorization
- [ ] Upload Image to S3

### Needs Attention
- [ ] Room with same room number can be added multiple times
- [ ] User should be able to cancel their own booking (solve with flag)


### FrontEnd
- [x] User Login UI
  - [x] Login integate with API
  - [x] Register UI
  - [x] Register integate with API
  - [x] Logout
- [x] Guest User Registration
  - [x] Redirect to login after registration
- [ ] Dashbaord
  - [ ] Menu
    - [x] For Admin
      - [x] Bookings
      - [ ] Payments
      - [ ] Room
    - [ ] User
      - [x] Bookings
      - [ ] Payments
  - [ ] Admin
    - [x] booking UI CRUD for Admin
      - [ ] booking integate with API CRUD
    - [ ] Add and view rooms
    - [ ] See all user -> change role
    - [x] See all bookings
      - [ ] Make payment for indivdual booking  
    - [ ] See all payments
  - [ ] User
    - [x] Booking for User  
    - [] View Previous Bookings
    - [ ] Make Payment

