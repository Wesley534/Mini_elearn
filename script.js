document.addEventListener('DOMContentLoaded', () => {
    const courses = [
        {
            id: 1,
            title: 'Python Basics',
            description: 'A beginner-friendly introduction to Python programming.',
            instructor: 'Dr. Ada Lovelace',
            duration: '4 weeks',
            fullDescription: 'This course covers the fundamental concepts of Python, including variables, data types, loops, and functions. No prior programming experience is required.'
        },
        {
            id: 2,
            title: 'Intro to AI',
            description: 'Explore the fascinating world of Artificial Intelligence.',
            instructor: 'Prof. Alan Turing',
            duration: '6 weeks',
            fullDescription: 'Learn about the history of AI, key concepts like machine learning and neural networks, and the ethical implications of AI in modern society.'
        },
        {
            id: 3,
            title: 'Web Development 101',
            description: 'Build your first website from scratch with HTML, CSS, and JS.',
            instructor: 'Sir Tim Berners-Lee',
            duration: '8 weeks',
            fullDescription: 'This comprehensive course will guide you through the essentials of front-end web development. You will build several projects to solidify your skills.'
        }
    ];

    const courseListing = document.getElementById('course-listing');
    const courseDetails = document.getElementById('course-details');
    const detailsContent = document.getElementById('details-content');
    const backToCoursesBtn = document.getElementById('back-to-courses');
    const progressTracker = document.getElementById('progress-tracker');

    let completedCourses = JSON.parse(localStorage.getItem('completedCourses')) || [];

    function saveProgress() {
        localStorage.setItem('completedCourses', JSON.stringify(completedCourses));
    }

    function updateProgressTracker() {
        progressTracker.textContent = `Progress: ${completedCourses.length} / ${courses.length} courses completed`;
    }

    function renderCourses() {
        courseListing.innerHTML = '';
        courses.forEach(course => {
            const isCompleted = completedCourses.includes(course.id);
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            courseCard.innerHTML = `
                ${isCompleted ? '<div class="completed-badge">✅</div>' : ''}
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <button class="btn view-details-btn" data-id="${course.id}">View Details</button>
            `;
            courseListing.appendChild(courseCard);
        });
        updateProgressTracker();
    }

    function renderCourseDetails(courseId) {
        const course = courses.find(c => c.id === courseId);
        if (course) {
            const isCompleted = completedCourses.includes(course.id);
            detailsContent.innerHTML = `
                <h2>${course.title}</h2>
                <p><strong>Instructor:</strong> ${course.instructor}</p>
                <p><strong>Duration:</strong> ${course.duration}</p>
                <p>${course.fullDescription}</p>
                <button id="mark-completed-btn" class="btn ${isCompleted ? 'completed' : ''}" data-id="${course.id}" ${isCompleted ? 'disabled' : ''}>
                    ${isCompleted ? '✅ Completed' : 'Mark as Completed'}
                </button>
            `;
            courseListing.style.display = 'none';
            courseDetails.style.display = 'block';
        }
    }

    courseListing.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-details-btn')) {
            const courseId = parseInt(e.target.getAttribute('data-id'));
            renderCourseDetails(courseId);
        }
    });

    backToCoursesBtn.addEventListener('click', () => {
        courseDetails.style.display = 'none';
        courseListing.style.display = 'grid';
    });

    detailsContent.addEventListener('click', (e) => {
        if (e.target.id === 'mark-completed-btn' && !e.target.classList.contains('completed')) {
            const courseId = parseInt(e.target.getAttribute('data-id'));
            if (!completedCourses.includes(courseId)) {
                completedCourses.push(courseId);
                saveProgress();
                renderCourses();
                renderCourseDetails(courseId); // Re-render details to update button state
            }
        }
    });

    // Initial render
    renderCourses();
});