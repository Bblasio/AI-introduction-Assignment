// Course data
const courses = [
    {
        id: 1,
        title: "Web Development Fundamentals",
        description: "Learn HTML, CSS, and JavaScript from scratch. Build responsive websites and master the basics of web development.",
        icon: "🌐",
        lessons: [
            { 
                title: "Introduction to HTML", 
                duration: "45 min",
                content: `
                    <p>HTML (HyperText Markup Language) is the most basic building block of the Web. It defines the structure and content of web pages. Everything you see on the internet, including text, images, and videos, is built using HTML.</p>
                    
                    <p><strong>Key Concepts:</strong></p>
                    <ul>
                        <li><strong>Tags:</strong> HTML uses markup tags to define elements. Tags are enclosed in angle brackets, like &lt;tagname&gt;. Most tags have an opening and closing version, e.g., &lt;p&gt;...&lt;/p&gt;.</li>
                        <li><strong>Elements:</strong> An element consists of an opening tag, content, and a closing tag. This creates the building blocks of your page.</li>
                        <li><strong>Attributes:</strong> Provide additional information about elements, such as &lt;img src="image.jpg" alt="A description"&gt; for images.</li>
                        <li><strong>Structure:</strong> A basic HTML document always starts with &lt;!DOCTYPE html&gt; and includes &lt;html&gt;, &lt;head&gt;, and &lt;body&gt; sections.</li>
                    </ul>
                    
                    <p>Start by creating your first HTML file. Save it as "index.html" and open it in a browser:</p>
                    <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;My First Page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Hello, World!&lt;/h1&gt;
    &lt;p&gt;This is my first HTML paragraph.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
                    
                    <p>Practice tip: Experiment with adding more tags like &lt;h2&gt; for subheadings or &lt;ul&gt; for lists. You'll see changes live in your browser!</p>
                `
            },
            { title: "CSS Styling Basics", duration: "60 min" },
            { title: "JavaScript Fundamentals", duration: "90 min" },
            { title: "Responsive Design", duration: "75 min" },
            { title: "Building Your First Website", duration: "120 min" }
        ]
    },
    {
        id: 2,
        title: "Python Programming",
        description: "Master Python programming from beginner to advanced. Learn data structures, algorithms, and real-world applications.",
        icon: "🐍",
        lessons: [
            { title: "Python Basics & Syntax", duration: "50 min" },
            { title: "Data Types & Variables", duration: "55 min" },
            { title: "Control Flow & Loops", duration: "70 min" },
            { title: "Functions & Modules", duration: "80 min" },
            { title: "Object-Oriented Programming", duration: "95 min" }
        ]
    },
    {
        id: 3,
        title: "Digital Marketing Mastery",
        description: "Comprehensive guide to digital marketing including SEO, social media, content marketing, and analytics.",
        icon: "📱",
        lessons: [
            { title: "Digital Marketing Overview", duration: "40 min" },
            { title: "SEO Fundamentals", duration: "65 min" },
            { title: "Social Media Strategy", duration: "70 min" },
            { title: "Content Marketing", duration: "60 min" },
            { title: "Analytics & Optimization", duration: "75 min" }
        ]
    },
    {
        id: 4,
        title: "Data Science Essentials",
        description: "Dive into data science with Python, statistics, machine learning, and data visualization techniques.",
        icon: "📊",
        lessons: [
            { title: "Introduction to Data Science", duration: "45 min" },
            { title: "Statistics for Data Science", duration: "85 min" },
            { title: "Data Cleaning & Preparation", duration: "70 min" },
            { title: "Machine Learning Basics", duration: "100 min" },
            { title: "Data Visualization", duration: "60 min" }
        ]
    }
];

// State management
let currentUser = null;
let currentCourseId = null;
let enrolledCourses = [];
let completedCourses = [];
let authMode = 'login';
let pendingEnroll = null;

// Initialize the app
function init() {
    renderCourses();
    loadProgress();
    setupModalListeners();
}

// Render course grid
function renderCourses() {
    const grid = document.getElementById('courseGrid');
    grid.innerHTML = courses.map(course => {
        const isEnrolled = enrolledCourses.includes(course.id);
        const isCompleted = completedCourses.includes(course.id);
        const statusClass = isCompleted ? 'status-completed' : isEnrolled ? 'status-in-progress' : 'status-available';
        const statusText = isCompleted ? '✓ Completed' : isEnrolled ? 'In Progress' : 'Available';
        return `
            <div class="course-card" onclick="openCourse(${course.id})">
                <div class="course-image">${course.icon}</div>
                <div class="course-content">
                    <div class="course-title">${course.title}</div>
                    <div class="course-description">${course.description}</div>
                    <div class="course-meta">
                        <div class="course-lessons">${course.lessons.length} lessons</div>
                        <div class="course-status ${statusClass}">
                            ${statusText}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Open course details
function openCourse(courseId) {
    currentCourseId = courseId;
    const course = courses.find(c => c.id === courseId);
    const isEnrolled = enrolledCourses.includes(courseId);
    const isCompleted = completedCourses.includes(courseId);
    
    document.getElementById('modalTitle').textContent = course.title;
    document.getElementById('modalDescription').textContent = course.description;
    
    const lessonList = document.getElementById('lessonList');
    const lessonsHeader = document.getElementById('lessonsHeader');
    const progressBar = document.getElementById('progressBar');
    const completeBtn = document.getElementById('completeBtn');
    const lessonContent = document.getElementById('lessonContent');
    
    if (!isEnrolled) {
        lessonsHeader.style.display = 'none';
        progressBar.style.display = 'none';
        completeBtn.style.display = 'none';
        lessonContent.style.display = 'none';
        lessonList.innerHTML = `
            <div style="text-align: center; padding: 40px 20px;">
                <h3 style="color: #666; margin-bottom: 20px;">Get Started with ${course.title}</h3>
                <p style="color: #888; margin-bottom: 30px;">Enroll to unlock all lessons and start your learning journey.</p>
                <button class="btn btn-primary" onclick="enrollCourse(${courseId})" style="padding: 15px 40px; font-size: 18px;">Enroll for Free</button>
            </div>
        `;
    } else {
        lessonsHeader.style.display = 'block';
        progressBar.style.display = 'block';
        lessonContent.style.display = 'none';
        completeBtn.style.display = 'block';
        lessonList.innerHTML = course.lessons.map((lesson, index) => `
            <div class="lesson-item" onclick="showLessonContent(${courseId}, ${index})">
                <div class="lesson-number">${index + 1}</div>
                <div class="lesson-info">
                    <div class="lesson-title">${lesson.title}</div>
                    <div class="lesson-duration">${lesson.duration}</div>
                </div>
            </div>
        `).join('');

        if (isCompleted) {
            completeBtn.textContent = '✓ Completed';
            completeBtn.className = 'btn btn-completed';
            completeBtn.onclick = null;
            document.getElementById('progressFill').style.width = '100%';
        } else {
            completeBtn.textContent = 'Mark as Completed';
            completeBtn.className = 'btn btn-success';
            completeBtn.onclick = completeCourse;
            document.getElementById('progressFill').style.width = '0%';
        }
    }

    document.getElementById('courseModal').classList.add('active');
}

// Enroll in course
function enrollCourse(courseId) {
    if (enrolledCourses.includes(courseId)) return;
    if (!currentUser) {
        pendingEnroll = courseId;
        showAuthModal('login');
        return;
    }
    enrolledCourses.push(courseId);
    saveProgress();
    openCourse(courseId);
}

// Show lesson content
function showLessonContent(courseId, index) {
    const course = courses.find(c => c.id === courseId);
    const lesson = course.lessons[index];
    let contentHtml = `<h2>${lesson.title}</h2>`;
    if (lesson.content) {
        contentHtml += lesson.content;
    } else {
        contentHtml += '<p>Content for this lesson will be available soon. In the meantime, review the key concepts and practice what you\'ve learned!</p>';
    }
    document.getElementById('lessonContent').innerHTML = contentHtml;
    document.getElementById('lessonContent').style.display = 'block';
    document.getElementById('lessonContent').scrollIntoView({ behavior: 'smooth' });
}

// Complete course
function completeCourse() {
    if (!currentCourseId || completedCourses.includes(currentCourseId)) return;
    
    completedCourses.push(currentCourseId);
    saveProgress();
    
    document.getElementById('progressFill').style.width = '100%';
    
    const completeBtn = document.getElementById('completeBtn');
    completeBtn.textContent = '✓ Completed';
    completeBtn.className = 'btn btn-completed';
    completeBtn.onclick = null;
    
    renderCourses();
}

// Auth functions
function showAuthModal(mode) {
    authMode = mode;
    document.getElementById('authTitle').textContent = mode === 'login' ? 'Login' : 'Sign Up';
    document.getElementById('authModal').classList.add('active');
}

function handleAuth(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    
    currentUser = { username };
    
    document.getElementById('userSection').innerHTML = `
        <div class="user-info">
            <div class="user-avatar">${username.charAt(0).toUpperCase()}</div>
            <span>${username}</span>
        </div>
        <button class="btn btn-secondary" onclick="logout()">Logout</button>
    `;
    
    closeModal('authModal');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    
    if (pendingEnroll) {
        enrollCourse(pendingEnroll);
        pendingEnroll = null;
    }
}

function logout() {
    currentUser = null;
    document.getElementById('userSection').innerHTML = `
        <button class="btn btn-primary" onclick="showAuthModal('login')">Login</button>
        <button class="btn btn-secondary" onclick="showAuthModal('signup')">Sign Up</button>
    `;
}

// Modal management
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function setupModalListeners() {
    // Close modal on background click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
}

// Progress persistence (in-memory only)
function saveProgress() {
    const progress = {
        enrolledCourses: enrolledCourses,
        completedCourses: completedCourses,
        user: currentUser
    };
    window.appProgress = progress;
}

function loadProgress() {
    if (window.appProgress) {
        enrolledCourses = window.appProgress.enrolledCourses || [];
        completedCourses = window.appProgress.completedCourses || [];
        currentUser = window.appProgress.user || null;
        
        if (currentUser) {
            document.getElementById('userSection').innerHTML = `
                <div class="user-info">
                    <div class="user-avatar">${currentUser.username.charAt(0).toUpperCase()}</div>
                    <span>${currentUser.username}</span>
                </div>
                <button class="btn btn-secondary" onclick="logout()">Logout</button>
            `;
        }
    }
    renderCourses();
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}