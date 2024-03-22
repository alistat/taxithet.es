# Taxithet.es Website

## About
This is a presentation page for a theatrical play providing simple online reservation capabilities.

## Content
### Presentation Page
The play presentation page is located in `/parastaseis/elefantas-tou-panagioti-renieri`

To change the URL of the page:
1. Rename the folder `/parastaseis/elefantas-tou-panagioti-renieri` to your liking
2. Replace the references to the old URL inside the page
3. Update the redirection in file [/index.php](https://github.com/alistat/taxithet.es/blob/main/index.php)


### Reservation Email
The template for the reservation confirmation email is inlined in file [/api/reservation.php](https://github.com/alistat/taxithet.es/blob/main/api/reservation.php).

The same email is sent to both the viewer who made the reservation and to the reservation manager.

## Configuration

### Available dates
The availabled dates are inlined inside the page as a javascript array [here](https://github.com/alistat/taxithet.es/blob/main/parastaseis/elefantas-tou-panagioti-renieri/index.php#L235).

### Emails and contact details
1. Copy file [/.env.sample](https://github.com/alistat/taxithet.es/blob/main/.env.sample) to `/.env` (i.e. copy and remove the `.sample` extention)
2. Fill in your details
3. Set `PRODUCTION` to `1` when deploying to production


Configuration includes the following fields:
* `EMAIL` the email account used to send the reservasion emails 
* `EMAIL_PASSWORD` the password to login to the email account via SMTP
* `EMAIL_SERVER` the SMTP server of the email account
* `RESERVATION_MANAGER_MAIL` the email address to inform for all reservations
* `RESERVATION_MANAGER_NAME` (*optional*) the name of the reservation manager receiving the emails - will not be shown
* `RESERVATION_MANAGER_PHONE` contact phone to include in reservation emails
* `RESERVATION_PUBLIC_PHONE` reservation phone to show publicly in the presentation page

## Requirements
The website requires PHP version 8 or better with PHP Composer enabled
