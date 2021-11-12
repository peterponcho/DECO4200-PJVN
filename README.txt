This prototype of Mealshare focuses on the interactions and is not high-fidelity in nature as our framer prototype.
It may be subjected to different layouts with our high-fidelity framer prototype due to limitations.

1. To run the prototype, make sure you are in your root folder, and type the command 'expo start' in terminal. 
    a.  Run prototype in iOS Simulator or expo go. 
    b.  For further setup details, refer to our report 'illustrated setup instructions'.

2. On the onboarding process, 
    a.  Our 'tap card' interaction is illustrated by pressing on the picture. 
    b.  On 'verify your identity' type 'Lisa Maroon' as your full name, or it won't allow you to go next. It is case insensitive and ignores whitespace.
        Ideally this would be your name. However, we use dummy data and set the full name as a fixed variable.

3. After the onboarding process, you will be guided to the bulletin board. 
    a.  To choose ingredients pack as shown in framer, press 'it's your turn to pick the ingredient pack!' on top right.
    b.  This discrepancy with our framer prototype is due to limitations of coding the navigation between screens.

4. In choosing ingredients:
    a. We use a variable as a dummy data for our user's balance. It is currently set to $60. To modify balance, change the value of 'originalBalance' variable.
    b. To change the data of ingredient packs, including the ingredients and prices, modify the data in 'ChoosingIngredientsData.tsx".
    c. MealShare will recognise the maximum number of servings that users can buy, users will not be able to add servings using the "+" button if the total price is        beyond their balance (as safety).
    d. Mealshare will also set the maximum number of servings should a user go back and choose another pack with higher price. Therefore they will never be a              negative balance.

5. Once you press confirm when choosing ingredients you will be back in the bulletin board.
    a. You can interact by adding comments on the default posts and liking posts. The text input will capture your input and add to the list of comments on a post.         However every post will contain the same comments as we do not have a real database.
    b. You can create a new post and use your camera to create a new post, and it will be added to the posts in the bulletin board. However, iOS Simulator does not         allow camera and therefore this will only be accessible within Expo Go application or through Web.
    c. You can track your ingredient by pressing the button below 'Announcements'. The delivery day is displayed according to the delivery day you chose previously         when choosing ingredients pack.



