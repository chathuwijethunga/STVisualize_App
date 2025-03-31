

# **CancerTalks - Visualization App**

**CancerTalks** is a web application designed to educate and provide insights into cancer care and statistics. The app visualizes cancer-related data and trends for healthcare professionals, researchers, and general users. It allows users to upload files for visualizing data through interactive scatter plots and UMAP plots.

---

## **Features**

- **File Upload**: Upload CSV or H5AD files to visualize data in scatter plots and UMAP plots.
- **Visualization**: Generate interactive scatter plots and UMAP visualizations of the cancer data.
- **Guidelines for Cancer Care**: Information about cancer care and its global impact.
- **Our Projects Section**: Overview of ongoing projects in cancer care, including the Visualization App.

---

## **Tech Stack**

- **Frontend**:
  - React.js
  - CSS (No Tailwind CSS used)
  - React Router (for navigation)
  
- **Backend**:
  - Flask (for data visualization and API endpoints)
  - Python libraries:
    - **Scanpy** for reading and processing H5AD files.
    - **Matplotlib** and **Seaborn** for generating visualizations.
    - **UMAP** for dimensionality reduction.
  
---

## **Setup and Installation**

### 1. **Clone the Repository**

```bash
git clone https://github.com/chathuwijethunga/STVisualize_App.git
cd STVisualize_App
```

### 2. **Install Backend Dependencies**

First, navigate to the **backend** directory and install the required Python dependencies:

```bash
cd backend
pip install -r requirements.txt
```

**`requirements.txt`** includes dependencies such as:
- Flask
- Scanpy
- Matplotlib
- Seaborn
- UMAP

### 3. **Install Frontend Dependencies**

Navigate to the **frontend** directory and install the required Node.js dependencies:

```bash
cd frontend
npm install
```

**`package.json`** includes dependencies such as:
- React
- React Router
- Axios

### 4. **Run Backend (Flask Server)**

Start the Flask server for backend functionality:

```bash
cd backend
python app.py
```

The Flask server will run on `http://localhost:5000`.

### 5. **Run Frontend (React Development Server)**

Start the React development server to view the frontend:

```bash
cd frontend
npm start
```

The React app will run on `http://localhost:3000`.

---

## **Usage**

1. **Homepage**:
   - When you open the app, you will see the **CancerTalks** homepage with the title and a button to go to the **File Upload** page.

2. **File Upload**:
   - Upload your data file (e.g., CSV or H5AD) using the **Upload** button.
   - After uploading, click on the **Generate Scatter Plot** or **Generate UMAP Plot** buttons to visualize the data.
   
3. **Visualization**:
   - The app will show a scatter plot and a UMAP plot based on the uploaded data.

4. **Guidelines for Cancer Care**:
   - View cancer care guidelines and general information about cancer care in the dedicated section.

5. **Our Projects**:
   - Explore ongoing projects, including the **Visualization App**, under the **Our Projects** section.

---

## **Folder Structure**

```
cancer-talks-visualization/
│
├── backend/                    # Backend server (Flask)
│   ├── app.py                  # Flask app with data processing and visualization
│   └── requirements.txt        # Python dependencies
│
├── frontend/                   # Frontend React app
│   ├── public/                 # Public assets like index.html
│   ├── src/                    # React source code
│   │   ├── components/         # React components (HomeScreen, FileUpload, etc.)
│   │   ├── App.js              # Main React component
│   │   ├── index.js            # Entry point for React
│   │   └── index.css           # CSS styles for the React app
│   └── package.json            # Node.js dependencies
│
└── README.md                   # Project documentation
```

---

## **Contributing**

We welcome contributions to improve the **CancerTalks** Visualization App. Please follow the steps below to contribute:

1. **Fork the repository**.
2. **Clone your fork** to your local machine.
3. **Create a new branch** (`git checkout -b feature-name`).
4. Make your changes and commit them (`git commit -am 'Add new feature'`).
5. **Push to the branch** (`git push origin feature-name`).
6. Open a **pull request**.

---

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## **Acknowledgments**

- **Scanpy** for data analysis and visualization.
- **Matplotlib** and **Seaborn** for creating charts and visualizations.
- **UMAP** for dimensionality reduction.
- **React** and **Flask** for building the app.

---

### **Final Notes:**
This README provides all the necessary information to set up and run the project. As you develop further, you can add more instructions for deployment, testing, or specific usage scenarios. Let me know if you need any additional sections!
