// Mock API service for demo purposes without backend

const mockApi = {
  // Get all jobs for the current user
  async get(url) {
    if (url === "/gigs") {
      // Return mock jobs from localStorage or empty array
      const storedJobs = localStorage.getItem("mockJobs");
      const jobs = storedJobs ? JSON.parse(storedJobs) : [];
      return { data: jobs };
    }

    if (url === "/todos") {
      const storedTodos = localStorage.getItem("mockTodos");
      const todos = storedTodos ? JSON.parse(storedTodos) : [];
      return { data: todos };
    }
    return { data: {} };
  },

  // Create a new job
  async post(url, data) {
    if (url === "/gigs") {
      const newJob = {
        _id: "job-" + Date.now(),
        ...data,
        dateApplied: new Date().toISOString(),
        status: data.status || "Applied",
        excitement: data.excitement || 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Get existing jobs
      const storedJobs = localStorage.getItem("mockJobs");
      const jobs = storedJobs ? JSON.parse(storedJobs) : [];
      jobs.push(newJob);

      // Save to localStorage
      localStorage.setItem("mockJobs", JSON.stringify(jobs));

      return { data: newJob };
    }

    if (url === "/todos") {
      const newTodo = {
        _id: "todo-" + Date.now(),
        text: data.text,
        completed: false,
        createdAt: new Date().toISOString()
      };

      const storedTodos = localStorage.getItem("mockTodos");
      const todos = storedTodos ? JSON.parse(storedTodos) : [];
      todos.push(newTodo);
      localStorage.setItem("mockTodos", JSON.stringify(todos));
      return { data: newTodo };
    }
    return { data: {} };
  },

  // Update a job
  async put(url, data) {
    if (url.startsWith("/gigs/")) {
      const jobId = url.split("/")[2];

      // Get existing jobs
      const storedJobs = localStorage.getItem("mockJobs");
      let jobs = storedJobs ? JSON.parse(storedJobs) : [];

      // Find and update the job
      const jobIndex = jobs.findIndex(job => job._id === jobId);
      if (jobIndex !== -1) {
        jobs[jobIndex] = {
          ...jobs[jobIndex],
          ...data,
          updatedAt: new Date().toISOString()
        };

        // Save to localStorage
        localStorage.setItem("mockJobs", JSON.stringify(jobs));

        return { data: jobs[jobIndex] };
      }
    }

    if (url.startsWith("/todos/")) {
      const todoId = url.split("/")[2];
      const storedTodos = localStorage.getItem("mockTodos");
      let todos = storedTodos ? JSON.parse(storedTodos) : [];

      const todoIndex = todos.findIndex(t => t._id === todoId);
      if (todoIndex !== -1) {
        todos[todoIndex] = { ...todos[todoIndex], ...data };
        localStorage.setItem("mockTodos", JSON.stringify(todos));
        return { data: todos[todoIndex] };
      }
    }
    return { data: {} };
  },

  // Delete a job
  async delete(url) {
    if (url.startsWith("/gigs/")) {
      const jobId = url.split("/")[2];

      // Get existing jobs
      const storedJobs = localStorage.getItem("mockJobs");
      let jobs = storedJobs ? JSON.parse(storedJobs) : [];

      // Remove the job
      jobs = jobs.filter(job => job._id !== jobId);

      // Save to localStorage
      localStorage.setItem("mockJobs", JSON.stringify(jobs));

      return { data: { message: "Job deleted" } };
    }

    if (url.startsWith("/todos/")) {
      const todoId = url.split("/")[2];
      const storedTodos = localStorage.getItem("mockTodos");
      let todos = storedTodos ? JSON.parse(storedTodos) : [];
      todos = todos.filter(t => t._id !== todoId);
      localStorage.setItem("mockTodos", JSON.stringify(todos));
      return { data: { message: "Todo deleted" } };
    }
    return { data: {} };
  }
};

export default mockApi;
