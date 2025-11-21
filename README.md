<!-- 
1. How did event.preventDefault() help in handling form submission?

Using event.preventDefault() stopped the page from refreshing when the form was submitted. This gave me full control over what happened next instead of letting the browser handle it automatically. It allowed me to run my custom validation before anything else happened. Without it, the form would submit even if there were errors. Overall, it made the form behave the way I wanted.

2. What is the difference between using HTML5 validation attributes and JavaScript-based validation? Why might you use both?

HTML5 validation attributes are built into the browser and give quick, basic checks without needing any JavaScript. JavaScript validation, on the other hand, lets you customize messages and add more complex rules. HTML5 is great for simple requirements, while JavaScript handles anything more advanced. Using both together creates stronger validation and a better user experience. They also act as a backup for each other in case one method doesn’t catch something.

3. Explain how you used localStorage to persist and retrieve the username. What are the limitations of localStorage for storing sensitive data?

I used localStorage.setItem() to save the username when the form was submitted successfully. Then, when the page loads, I checked localStorage.getItem() and put the name back into the input field. This made the form feel more personal and convenient for the user. However, localStorage is not secure because anyone with access to the browser can read it. That’s why it should never be used to store passwords or sensitive information.

4. Describe a challenge you faced in implementing the real-time validation and how you solved it.

One challenge I had was keeping the confirm password field updated whenever the main password changed. At first, the confirm password only validated when the user typed in that specific box. This felt confusing because the errors didn’t update automatically. To fix this, I triggered the confirm password validation whenever the password field changed. After that, the real-time feedback worked smoothly.

5. How did you ensure that custom error messages were user-friendly and displayed at the appropriate times?

I wrote clear and simple messages that explained exactly what was wrong with each input. I also only showed an error when the user actually made a mistake, not before they started typing. When the user fixed the issue, I cleared the message right away. I added visual cues, like changing input colors, to make errors easy to spot. This helped make the form feel more helpful and less frustrating. -->
