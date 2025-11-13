# Python Project

## Setup

### Virtual Environment

A virtual environment has been created for this project to manage dependencies in isolation.

### Activating the Virtual Environment

**Windows PowerShell:**
```powershell
.\venv\Scripts\Activate.ps1
```

**Windows Command Prompt (cmd):**
```cmd
venv\Scripts\activate.bat
```

**Git Bash / WSL:**
```bash
source venv/Scripts/activate
```

### Deactivating the Virtual Environment

To deactivate the virtual environment, simply run:
```
deactivate
```

## Running the Application

After activating the virtual environment, run:
```
python main.py
```

Or using the py launcher:
```
py main.py
```

## Installing Dependencies

To install project dependencies (if a requirements.txt file exists):
```
pip install -r requirements.txt
```

To freeze current dependencies:
```
pip freeze > requirements.txt
```
