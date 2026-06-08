#------------------------
#
#   APP STARTER ( python run.py )
#
#------------------------

from backend import create_app  # adjust import to your project
from waitress import serve

app = create_app()

if __name__ == "__main__":
    serve(app, host="0.0.0.0", port=5000)