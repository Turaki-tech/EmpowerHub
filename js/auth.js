// Register new user
document.getElementById("registerForm")?.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Check if fields are filled
    if (!name || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        alert("User with this email already exists!");
    } else {
        // Save new user data to localStorage
        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registration successful!");

        // Redirect to homepage after registration
        window.location.href = "index.html";
    }
});

// Login existing user
document.getElementById("loginForm")?.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    // Check if fields are filled
    if (!email || !password) {
        alert("Please fill in both email and password.");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        alert("Login successful!");

        // Save user session and redirect to homepage
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "index.html";
    } else {
        alert("Invalid email or password.");
    }
});

// Check for existing user session on page load
document.addEventListener("DOMContentLoaded", function() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
        document.getElementById("welcomeMessage").textContent = `Welcome, ${currentUser.name}!`;
        document.getElementById("logoutButton").style.display = "block";
    }
});

// Logout functionality
document.getElementById("logoutButton")?.addEventListener("click", function() {
    localStorage.removeItem("currentUser");
    alert("You have been logged out.");
    window.location.href = "login.html";
});











// Check for login persistence
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn === "true") {
        document.querySelectorAll('a[href="login.html"]').forEach(link => {
            link.innerText = "Logout";
            link.addEventListener("click", logoutUser);
        });
    }
}

// Login Function
function loginUser() {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("loginTime", new Date().toISOString());
    window.location.href = "index.html"; // Redirect to home page
}



// Check login duration
function checkLoginDuration() {
    const loginTime = new Date(localStorage.getItem("loginTime"));
    const currentTime = new Date();
    const differenceInDays = (currentTime - loginTime) / (1000 * 60 * 60 * 24);

    if (differenceInDays >= 5) {
        logoutUser();
    }
}

// Call checkLoginStatus and checkLoginDuration on page load
document.addEventListener("DOMContentLoaded", () => {
    checkLoginStatus();
    checkLoginDuration();
});

// Sample posts (Replace with database data in a real-world app)
const posts = [
    { id: 1, user: "Alice", content: "Learning JavaScript!", likes: 5, comments: ["Great!", "Keep it up!"] },
    { id: 2, user: "Bob", content: "Just finished my first project.", likes: 10, comments: ["Congrats!", "Amazing work!"] },
];

// Select the post container
const postContainer = document.getElementById("post-feed");

// Function to render posts
function renderPosts() {
    postContainer.innerHTML = ''; // Clear existing posts

    posts.forEach(post => {
        // Create post card
        const postCard = document.createElement("div");
        postCard.classList.add("post-card");

        // Post user and content
        postCard.innerHTML = `
            <h3>${post.user}</h3>
            <p>${post.content}</p>
            <div class="interactions">
                <div class="like-comment">
                    <button onclick="likePost(${post.id})"><i class="fas fa-thumbs-up"></i> Like</button>
                    <button onclick="commentPost(${post.id})"><i class="fas fa-comment"></i> Comment</button>
                </div>
                <span class="like-count">${post.likes} Likes</span>
                <span class="comment-count">${post.comments.length} Comments</span>
            </div>
        `;

        // Append post card to container
        postContainer.appendChild(postCard);
    });
}

// Like post function
function likePost(postId) {
    const post = posts.find(p => p.id === postId);
    post.likes += 1;
    renderPosts();
}

// Comment post function
function commentPost(postId) {
    const comment = prompt("Enter your comment:");
    if (comment) {
        const post = posts.find(p => p.id === postId);
        post.comments.push(comment);
        renderPosts();
    }
}

// Initial render
renderPosts();

const posts = [
    { id: 1, user: "Alice", content: "Learning JavaScript!", likes: 5, comments: ["Great!", "Keep it up!"] },
    { id: 2, user: "Bob", content: "Just finished my first project.", likes: 10, comments: ["Congrats!", "Amazing work!"] },
];

// Select the post container
const postContainer = document.getElementById("post-feed");

// Function to render posts
function renderPosts() {
    postContainer.innerHTML = ''; // Clear existing posts

    posts.forEach(post => {
        // Create post card
        const postCard = document.createElement("div");
        postCard.classList.add("post-card");

        // Post header with user and profile image
        const postHeader = document.createElement("div");
        postHeader.classList.add("post-header");

        const userImage = document.createElement("img");
        userImage.src = "profile-placeholder.png"; // Add actual profile picture path if available
        userImage.alt = `${post.user}'s profile picture`;

        const userName = document.createElement("h3");
        userName.textContent = post.user;

        postHeader.appendChild(userImage);
        postHeader.appendChild(userName);
        postCard.appendChild(postHeader);

        // Post content
        const postContent = document.createElement("p");
        postContent.textContent = post.content;
        postCard.appendChild(postContent);

        // Interactions (like and comment)
        const interactions = document.createElement("div");
        interactions.classList.add("interactions");

        const likeComment = document.createElement("div");
        likeComment.classList.add("like-comment");

        const likeButton = document.createElement("button");
        likeButton.innerHTML = `<i class="fas fa-thumbs-up"></i> Like`;
        likeButton.onclick = () => likePost(post.id);

        const commentButton = document.createElement("button");
        commentButton.innerHTML = `<i class="fas fa-comment"></i> Comment`;
        commentButton.onclick = () => commentPost(post.id);

        likeComment.appendChild(likeButton);
        likeComment.appendChild(commentButton);

        const likeCount = document.createElement("span");
        likeCount.classList.add("like-count");
        likeCount.textContent = `${post.likes} Likes`;

        const commentCount = document.createElement("span");
        commentCount.classList.add("comment-count");
        commentCount.textContent = `${post.comments.length} Comments`;

        interactions.appendChild(likeComment);
        interactions.appendChild(likeCount);
        interactions.appendChild(commentCount);

        postCard.appendChild(interactions);

        // Append post card to container
        postContainer.appendChild(postCard);
    });
}

// Initial render
renderPosts();