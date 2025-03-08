## INTODUCTION TO HTML

### ASSIGNMENT:

***Graphical Mockup*** \
**Head**: Conatins title
**Header**: Contains the Name and Role.\
**Main** : A welcome message and a brief introduction. \
**Footer**: Contains copyright information and social media links.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Personal Website</title>

</head>
<body>
    <header>
        <h1>Irhtayag Ayrus</h1>
        <p>Student</p>
    </header>
    <main>
        <section id="home">
            <h2>Welcome to My Website!</h2>
            <p>Hello! I'm Ayrus, Just a Fellow exploring new things to make  something big</p>
        </section>

        <section id="about">
            <h2>About Me</h2>
            <p>An undergrad pursuing B-TECH in Electrical and Computer Engineering.I enjoy solving problems by breaking them down into manageable pieces and building efficient, functional solutions. The main reason which always keeps my interest in coding has always been a single moment - "The moment when codes gives solution without error in seconds, on which I have worked for hours!".Aside from coding my interest lies in Astronomy, Chess and Yoga.</p>
        </section>
    </main>

    <footer>
        <p>&copy; 2025 AYRUS. All rights reserved.</p>
    </footer>
</body>
</html>
```

### CHALLENGE:

***The old <marquee> tag to make the h1 title scroll horizontally?*** 
```html
<marquee >
<h1>My Terrarium</h1>
</marquee>
```
## INTRODUCTION TO CSS 

### ASSIGNMENT:
**Refactoring***
```css
body {
    font-family: helvetica, arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
}

h1 {
    color: red;
    text-align: center;
    font-size: 2rem;
}

#page {
    display: flex;
    justify-content: center; 
    align-items: center; 
    height: 100vh;
    width: 100%;
}


#left-container {
    background-color: #eee;
    width: 15%;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center;
    position: relative;
}

#right-container {
    background-color: #eee;
    width: 15%;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center;
    position: relative; 
}

.plant-holder {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 13%;
}
.plant {
    max-width: 150%;
    max-height: 150%;
    z-index: 2;
    position: relative;
}
#terrarium {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 60%;
    height: 100%;
    position: relative;
    z-index: 1;
}
.jar-walls {
    height: 80%;
    width: 60%;
    background: #d1e1df;
    border-radius: 1rem;
    position: relative;
    opacity: 0.5;
    z-index: 2;
}
.jar-top {
    width: 50%;
    height: 5%;
    background: #d1e1df;
    position: absolute;
    top: 5%; 
    left: 25%;
    opacity: 0.7;
    z-index: 1;
}
.jar-bottom {
    width: 55%;
    height: 1%;
    background: #d1e1df;
    position: absolute;
    bottom: 9%;
    opacity: 0.7;
}
.dirt {
    width: 60%;
    height: 5%;
    background: #3a241d;
    position: absolute;
    bottom: 10%; 
    border-radius: 0 0 1rem 1rem;
    opacity: 0.7;
    z-index: -1; 
}
```

### CHALLENGE:
***Add a 'bubble' shine to the left bottom area of the jar to make it look more glasslike. You will be styling the .jar-glossy-long and .jar-glossy-short to look like a reflected shine.***
```css
.jar-glossy-long {
    position: absolute;
    width: 3.5%;
    height: 20%;
    background: rgb(182, 239, 247);
    opacity:0.5;
    border-radius: 6px;
    bottom: 18%;
    left: 5%;
    z-index: 2;
}

.jar-glossy-short {
    position: absolute;
    width: 3%;
    height: 5%;
    background: rgb(183, 239, 247);
    opacity: 0.7;
    border-radius: 6px;
	left: 5%;
    bottom: 43%;
}
```

### DOM MANIPULATION AND A CLOSURE

### ASSIGNMENT:
***Research the DOM a little more by 'adopting' a DOM element. Visit the MDN's list of DOM interfaces and pick one. Find it being used on a web site in the web, and write an explanation of how it is used.***

**The Event Interface in the DOM**

In web development, an event is something that happens on a webpage. This could be a user clicking a button, typing in a text box, moving the mouse, or even the page finishing loading. The Event interface in the Document Object Model (DOM) is what helps web pages recognize and respond to these actions.\

**How Events Work**\
Webpages listen for events and respond to them using event listeners. An event listener is a piece of code that waits for a specific action to happen and then runs a function in response.

For example, if you want something to happen when a button is clicked, you can use addEventListener() like this:
```javascript
document.querySelector("button").addEventListener("click", function() {
    alert("Button was clicked!");
});
```
Here, the click event is being listened for, and when the user clicks the button, an alert appears.

**Different Types of Events**
There are many kinds of events in the DOM, including:

-Mouse Events (e.g., click, mouseover, mouseout)
-Keyboard Events (e.g., keydown, keyup)
-Form Events (e.g., submit, input)
-Touch Events (e.g., touchstart, touchmove)
-Event Bubbling and Propagation

**Conclusion**
Events are a fundamental part of making web pages interactive. By using event listeners, developers can make buttons work, forms submit, animations play, and much more. Understanding events is a key skill for any web developer!

### CHALLENGE:
```JAVASCRIPT
let zIndexCounter = 10; 
terrariumElement.addEventListener('dblclick', bringToFront);
    terrariumElement.style.position = "absolute";
function bringToFront() {
        zIndexCounter++;
        terrariumElement.style.zIndex = zIndexCounter;
        console.log(`Double-click detected on ${terrariumElement.id}, new z-index: ${zIndexCounter}`);
    }
```


