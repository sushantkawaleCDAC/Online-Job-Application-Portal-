// Get jobs from localStorage or initialize an empty array
let jobs = JSON.parse(localStorage.getItem('jobs')) || [];

// Function to post a new job
function postJob() {
  const title = document.getElementById('title').value;
  const company = document.getElementById('company').value;
  const description = document.getElementById('description').value;
  const location = document.getElementById('location').value;

  if (title && company && description && location) {
    const job = { title, company, description, location };
    jobs.push(job);
    localStorage.setItem('jobs', JSON.stringify(jobs));
    alert('Job posted successfully!');
    document.getElementById('jobForm').reset();
  } else {
    alert('Please fill out all fields');
  }
}

// Function to display job listings
function displayJobs() {
  const jobListings = document.getElementById('job-listings');
  if (jobs.length === 0) {
    jobListings.innerHTML = '<p>No jobs available.</p>';
    return;
  }
  jobListings.innerHTML = '';
  jobs.forEach((job, index) => {
    const jobDiv = document.createElement('div');
    jobDiv.className = 'job';
    jobDiv.innerHTML = `
      <h3>${job.title} at ${job.company}</h3>
      <p>${job.description}</p>
      <p><strong>Location:</strong> ${job.location}</p>
      <button onclick="deleteJob(${index})">Delete Job</button>
    `;
    jobListings.appendChild(jobDiv);
  });
}

// Function to delete a job listing
function deleteJob(index) {
  jobs.splice(index, 1);
  localStorage.setItem('jobs', JSON.stringify(jobs));
  displayJobs();
}

// Run displayJobs when loading job-listings.html
if (document.getElementById('job-listings')) {
  displayJobs();
}
