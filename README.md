# AI-introduction-Assignment 

## LearnHub – Mini E-Learning Platform 


## 📖 Description 
A simple, responsive mini e-learning platform built with vanilla HTML, CSS, and JavaScript.  
Users can browse courses, enroll for free (after logging in), view lesson lists, access sample content,  
and track progress. 

---

## 🎯 Features 
- **User Authentication:** Basic login/signup (in-memory, no backend). 
- **Course Catalog:** Grid of courses with icons, descriptions, and status (Available, In Progress, Completed). 
- **Enrollment System:** Enroll in courses for free; requires login. Non-enrolled courses show an *Enroll* prompt. 
- **Lesson Viewing:** Clickable lessons display content in a modal. Includes “Introduction to HTML” in the Web Development course. 
- **Progress Tracking:** Mark courses as completed with a visual progress bar. 
- **Responsive Design:** Works on desktop and mobile with smooth animations. 
- **In-Memory Persistence:** Progress saves to browser session (resets on refresh). 
---

## 🛠 Tech Stack 
- **Frontend:** HTML5, CSS3 (Flexbox/Grid), Vanilla JavaScript (ES6+). 
- **Styling:** Custom CSS with gradients, shadows, and transitions. 
- **No Dependencies:** Pure vanilla code – no frameworks or libraries. 
## Installation 

1. **Clone or download the project files:**  
```
   git clone https://github.com/Bblasio/AI-introduction-Assignment.git 
```

## Usage 

### Browse Courses 
- Scroll through the course grid.   
- Each card shows the title, description, lesson count, and status.   

### Login / Sign Up 
- Click **Login** or **Sign Up** in the header.   
- Use any username/password (stored in-memory).   

### Enroll in a Course 
1. Click a course card to open the modal.   
2. If not enrolled, click **Enroll for Free** (login required).   
3. Once enrolled, the lesson list becomes available.   

### View Lessons 
- Click a lesson to load its content below the list.   
- Example: In *Web Development Fundamentals*, Lesson 1 ("Introduction to HTML") shows basics with code snippets.   

### Track Progress 
- Use the **Mark as Completed** button to finish the course.   
- The status updates to **✓ Completed** and the progress bar fills.   

### Logout 
- Click **Logout** to reset the session.   

### Example Workflow 
1. Log in as `student`.   
2. Enroll in **Web Development Fundamentals**.      
3. Mark course complete → Status changes to **Completed**.  


## Project Structure   
```
learnhub/
├── index.html # Main entry point
├── styles.css # All styles and animations
└── script.js # Core logic, data, and functions
```

## Limitations 

- **No real backend**: Auth and progress are session-only (use `localStorage` for persistence across sessions).   
- **Basic auth**: No password hashing or validation.   
- **Content**: Only one lesson has full content; others are placeholders.   
- **No per-lesson progress**: Course-level only.  
 
## Contributing 

1. Fork the repo.   
2. Create a feature branch:   
   ```bash
   git checkout -b feature/amazing-feature 

   
## License 
---

Built with ❤️ by **Blasio Odhiambo** – Feel free to ⭐ star / fork! 🚀 

