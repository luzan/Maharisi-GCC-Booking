## Feature Testing
> Task: Check all the features and list them out

### *Sample Report Format*

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

### *Feature Test Reports Here*



## API Testing
>Task: Check All APIs with for authentication and authorization

### *Sample Report Format*

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


### *API Test Reports Here*

