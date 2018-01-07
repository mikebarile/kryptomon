## Component Hierarchy

**AuthFormContainer**
 - AuthForm

**App**
 - TopBar
 - Footer

 **HomeContainer**
 - Home

**ListingsContainer**
 - DatesFilter
 - PriceFilter
 - ListingsIndex
  + ListingIndexItem
  + ResultNav
 - Map

**ListingContainer**
 - ListingHost
 - ListingGuest

**BookingsContainer**
 - Listing
  + BookingsIndex
   + BookingsIndexItem

**TripsContainer**
 - UpcomingTripsHeader
 - TripsIndex
  + TripsIndexItem

**NewListingContainer**
 - NewListingForm
   + NewListingHome
   + NewListingFormOne
   + NewListingFormTwo
   + NewListingFormThree

## Routes

|Path   | Component   |
|-------|-------------|
| "/" | "App" |
| "/home" | "HomeContainer" |
| "/sign-up" | "AuthFormContainer" |
| "/listings/" | "ListingsContainer" |
| "/listings/:listing_id" | "ListingContainer" |
| "/my-listings" | "BookingsContainer" |
| "/my-trips" | "TripsContainer" |
| "/add-a-listing/**" | "NewlistingContainer" |
