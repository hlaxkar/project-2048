@echo off

rem Open a new terminal window and start the Angular server
start cmd /c ng serve --host=0.0.0.0

rem Open a new terminal window and start the JSON server
@REM start cmd /c json-server --host 192.168.29.99 --watch src/assets/db/database.json
