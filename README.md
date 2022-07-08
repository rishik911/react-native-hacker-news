# react-native-hackernews

The app consists of two main screens : 
1. Top stories feed 

  This screen is handled using a paginated flatlist , the user can see the list of storis . He can either press on the the list item to see the children component having the children stories or press on the link to view the story details using the phone browser.

2. Children details view

   This screen is also handled usning a paginated flatlisy, the user can see the list of the stories .


The libraries used are : 
1. @testing-library/react-native  -> for writing the unit test cases
2. axios -> for handling api calls
3. moment -> for handling unix timestamp conversions
4. react-redux , redux -> for global state management 
5. redux-saga -> middleware 
