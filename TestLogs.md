## Feature Testing

> Task: Check all the features and list them out

### _Sample Report Format_

```
Feature: Creating Booking
Expected Feature:
    - Booking needs to be created with valid data
    - When booking is made Booking Dates needs to be added in Rooms Document, under the room that is booked.
Test Status: Passed | Failed | Needs Attention
Observation:
    - There is no use of sending few information on booking
```

> Note: Remember to have observations in detail if Test Status is Failed (with when it failed and what was the user role and other data when you tested it). Need attention can be status when you think there can be improvements or need fixes.

### _Feature Test Reports Here_

## API Testing

> Task: Check All APIs with for authentication and authorization

### _Sample Report Format_

```
API: /api/v1/users
Roles: Admin, User
Expected Task
    - Admin can see all the user
    - User will be unauthorized
    - User information returned should not have password
Test Status: Passed | Failed | Needs Attention
Observation:
    - Looks like there are other values which are not necessary and are shown on the returned data
```

> Note: Remember to have observations in detail if Test Status is Failed (with when it failed and what was the user role and other data when you tested it). Need attention can be status when you think there can be improvements or need fixes.

### _API Test Reports Here_

### User Controller

```
Method: Post
API: http://localhost:3000/api/v1/users
Expected Task: Able to create a new user
Test Status: Passed
```

```
Method: Get
API: http://localhost:3000/api/v1/users
Role: Admin
Expected Task: Get all users of the system
Test Status: Passed
```

```
Method: Get
API: http://localhost:3000/api/v1/users
Role: User
Expected Task: Get all users of the system
Test Status: Passed
```

```
Method: Get
API: http://localhost:3000/api/v1/users/{id}
Role: Admin
Expected Task: Get specific user based on id
Test Status: Passed
```

```
Method: Get
API: http://localhost:3000/api/v1/users/{currentUser_id}
Role: User
Expected Task: Return user details of current user
Test Status: Passed
```

```
Method: Put
API: http://localhost:3000/api/v1/users/{id}
Role: Admin
Expected Task: Update user information
Test Status: Failed
Observation: Not working and Returned with message "currentUser is not defined"
Update: Fixed
Test Status: Passed
```

```
Method: Put
API: http://localhost:3000/api/v1/users/{currentUser_id}
Role: User
Expected Task: Update user information
Test Status: Failed
Observation: Not working and Returned with message "currentUser is not defined"
Update: Fixed
Test Status: Passed
```

```
Method: Delete
API: http://localhost:3000/api/v1/users/{id}
Role: Admin
Expected Task: Delete the user
Test Status: Failed
Observation: Not working and Returned with message "currentUser is not defined"
Update: Fixed
Test Status: Passed
```

```
Method: Delete
API: http://localhost:3000/api/v1/users/{currentUser_id}
Role: User
Expected Task: Delete the user
Test Status: Failed
Observation: Not working and Returned with message "currentUser is not defined"
Update: Fixed
Test Status: Passed
```

### Room Controller

```
Method: Post
API: http://localhost:3000/api/v1/rooms
Role: Admin
Expected Task: Add new room information
Test Status: Needs Attention
Observation: Room with same room number can be added multiple times
```

```
Method: Post
API: http://localhost:3000/api/v1/rooms
Role: User
Expected Task: Cannot add new room details
Test Status: Passed
```

```
Method: Get
API: http://localhost:3000/api/v1/rooms
Role: Admin
Expected Task: Return all rooms
Test Status: Passed
```

```
Method: Get
API: http://localhost:3000/api/v1/rooms
Role: User
Expected Task: Return all rooms
Test Status: Passed
```

```
Method: Get
API: http://localhost:3000/api/v1/rooms/{id}
Role: Admin
Expected Task: Returns specific room by id
Test Status: Passed
```

```
Method: Get
API: http://localhost:3000/api/v1/rooms/{id}
Role: User
Expected Task: Returns specific room by id
Test Status: Passed
```

```
Method: Put
API: http://localhost:3000/api/v1/rooms/{id}
Role: Admin
Expected Task: Update specific room by id
Test Status: Passed
```

```
Method: Put
API: http://localhost:3000/api/v1/rooms/{id}
Role: User
Expected Task: Cannot update room details
Test Status: Passed
```

```
Method: Delete
API: http://localhost:3000/api/v1/rooms/{id}
Role: Admin
Expected Task: Delete specific room based on id
Test Status: Passed
```

### Booking Controller

```
Method: Post
API: http://localhost:3000/api/v1/bookings
Role: Admin
Expected Task: Create new booking by room type
Test Status: Passed
```

```
Method: Post
API: http://localhost:3000/api/v1/bookings
Role: User
Expected Task: Create new booking by room type
Test Status: Passed
```

```
Method: Post
API: http://localhost:3000/api/v1/bookings
Role: Admin
Expected Task: Create new booking by room id
Test Status: Failed
Observation: Not working
```

```
Method: Get
API: http://localhost:3000/api/v1/bookings
Role: Admin
Expected Task: Returns all bookings
Test Status: Passed
```

```
Method: Get
API: http://localhost:3000/api/v1/bookings
Role: User
Expected Task: Cannot access all bookings
Test Status: Passed
```

```
Method: Get
API: http://localhost:3000/api/v1/bookings/{id}
Role: Admin
Expected Task: Return booking by id
Test Status: Failed
Observation: Returned "unauthorized" message
Update: Fixed
Test Status: Passed
```

```
Method: Get
API: http://localhost:3000/api/v1/bookings/{id}
Role: User
Expected Task: Return booking by id
Test Status: Failed
Observation: Returned "unauthorized" message
Update: Fixed
Test Status: Passed
```

```
Method: Put
API: http://localhost:3000/api/v1/bookings/{user_id}{booking_id}
Role: Admin
Expected Task: Update booking
Test Status: Passed
```

```
Method: Put
API: http://localhost:3000/api/v1/bookings/{user_id}{booking_id}
Role: User
Expected Task: Update booking
Test Status: Passed
```

```
Method: Delete
API: http://localhost:3000/api/v1/bookings/{id}
Role: Admin
Expected Task: Delete specific booking by id
Test Status: Passed
```

```
Method: Delete
API: http://localhost:3000/api/v1/bookings/{id}
Role: User
Expected Task: Delete own booking
Test Status: Needs attention
Observation: User should be able to cancel their own booking
```

### Payment Controller

```
Method: Post
API: http://localhost:3000/api/v1/payments/booking/{booking_id}
Role: Admin
Expected Task: Create payment for specific booking
Test Status: Passed
```

```
Method: Post
API: http://localhost:3000/api/v1/payments/booking/{booking_id}
Role: User
Expected Task: Create payment for specific booking
Test Status: Passed
```

```
Method: Get
API: http://localhost:3000/api/v1/payments
Role: Admin
Expected Task: Get all payments
Test Status: Passed
```

```
Method: Get
API: http://localhost:3000/api/v1/payments
Role: User
Expected Task: Cannot access all payments
Test Status: Passed
```

```
Method: GET
API: http://localhost:3000/api/v1/payments/{payment_id}
Role: Admin
Expected Task: Return payment details for specific booking
Test Status: Passed
```

```
Method: GET
API: http://localhost:3000/api/v1/payments/{payment_id}
Role: User
Expected Task: Return payment details for specific booking
Test Status: Failed
Observation: Returns "unauthorized" message even for your own booking payment
Update:
 - Payment needs to have user {user_id, firstName, lastName, email } data.
 - Unauthorized issue fixed
Test Status: Pass
```
