Movies application for MSc in Computing (Enterprise Software Systems)

Additional items as part of Assignment
---------------------------------------------------------------------
Actors section
---------------------------------------------------------------------
Additional actor specific API calls in tmdb-api.js
Components:
+   actorCard
+   ActorDetails
+   actorList
+   headerActor
+   templateActorPage
+   templateActorsListPage
+   actorFilmography
+   actorFilmCard

Actors Pages:
+   actorDetailsPage.jsx
+   popularActors.jsx

Actors Routing:
+   Added additional routes in src/index.jsx for actors pages
+      <Route path="/actors/profile/:id" element={<ActorDetailsPage/>} />          
+      <Route path="/actors/popular" element={<PopularActorsPage/>} />  

Actor Details page includes biography of Actor, photos of actor, and filmography section showing films and movies they are known for.

The filmography section includes film cards that have complex interaction (found this ability in MUI documentation). 
+   Clicking on chevron at bottom expands card to show overview. 
+   Click on image links to movie details page to see film details. 
+   Used <CardActionArea> combined with <Link> to allow user click on image of film on moviecard to go to movies details page.

Filmography includes combined credits i.e. films and tv shows actor has starred in. The actorFilmography and actorFilmCard components were added to facilitate this.

---------------------------------------------------------------------
Similar Movies
---------------------------------------------------------------------

---------------------------------------------------------------------
TV Series
---------------------------------------------------------------------

---------------------------------------------------------------------
Enhanced Filter
---------------------------------------------------------------------
Added Enhaced filter on Home screen to allow fileter by year. For this made changes on 
Pages:
+   homepage.jsx

Components:
+   movieFilterUI
+   filterMoviesCard

Incorporated @mui/x-date-pickers from MUI and set to year only date picker.
Had to install following to make work...

+ npm install @mui/material @emotion/react @emotion/styled
+ npm install dayjs --save

Had to add additional function called handleDateChange in the filterMoviesCard component. Datepicker sends value of datepicker instead of event object. This led to errors when the original handleInputUser function called e.preverntDefaults(); 

Additionally I used substring function to extract year from universal timestamp value the date picker returns.

I also moved the Drawer component to right hand side of screen instead of left because when movies filtered down to one  or two, they were hidden behind the drawer.

---------------------------------------------------------------------
Pagination
---------------------------------------------------------------------

Added pagination to Discovery, Upcoming Movies, Favourites, Must Watch and Popular Actors pages. Used @tanstack/react-query and refactored all queries using standard react-query so queryClient and queryClientProvider could be shared across all pages from root level. Pagination function implemented with @tanstack/react-query includes prefetch functionaility to allow data to be continually displayed on screen while next page data is being retrieved.

Components:
+   headerMovieList

Changing over to @tanstack/react-query broke favourites page so had to refactor section of code to make work again (around useQueries and mapping section). 

Pagination added in headerMovieList/index.jsx which is reused across Homepage, Upcoming Movies, Popular Actors and Favourites pages. Having like this avoids repetition of code. 

Refactored code in headerMovieList to remove back and forward arrow icons since @MUI pagination being used to provide navigation back and forth between pages. Added Grid to header to allow for better formatting and positioning of content. 

---------------------------------------------------------------------
Login
---------------------------------------------------------------------

Added authentication with Supabase. Created new AuthContext and wrapped all elements in it in index.js. AuthContext reaches carries out email login verification against users table on the account. Added keys to .env file and created supabase/client.js to create client instance that can be used across the application.

Created custom login page and added login/logout menu item to siteheader (toggles between two depending on whether logged in or not). 
Pages:
    login.jsx

Components:
    authRoute

Contexts:
    authProvider

Added following pages to authenticated routes:
    <Route element={<AuthRoute />}>
        <Route path="/homeauth" element={<Home />} />
        <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
        <Route path="/actors/profile/:id" element={<ActorDetailsPage />} />
        <Route path="/reviews/form" element={<AddMovieReviewPage />} />
        <Route path="/reviews/:id" element={<MovieReviewPage />} />
    </Route>

---------------------------------------------------------------------
Watch List section
---------------------------------------------------------------------
Added page for must watch items. Page is protected route so user must be locked in. Page based on favourites page and allows user to add reviews. Also allows users remove from watchlist. Usual Pagination and extended filter included on page. Added following for this functionality.

Pages:
    watchListPage.jsx

Components:
    cardIcons/removeFromMustWatch

Contexts:
    movieContext

Added following pages to authenticated routes:
    <Route element={<AuthRoute />}>
        ...
        <Route path="/movies/watchlist" element={<WatchlistMoviesPage />} />
        ...
    </Route>

---------------------------------------------------------------------
Movie Details section
---------------------------------------------------------------------
Changed format of header, added link to homepage of movie in detailed view where available.