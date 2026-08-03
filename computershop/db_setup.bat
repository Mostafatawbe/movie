@ECHO OFF
REM Batch file to set up the computerlogs database

REM -- Configuration --
SET DB_USER=root
SET DB_PASS=
SET DB_NAME=project
SET MYSQL_PATH="C:\xampp\mysql\bin\mysql.exe"
REM -- End Configuration --

ECHO Beginning database setup...

ECHO 1. Creating database...
%MYSQL_PATH% -u%DB_USER% -p%DB_PASS% < "computerlogs_createDB.sql"
IF %ERRORLEVEL% NEQ 0 ( 
    ECHO ERROR: Failed to create database.
    GOTO :EOF
)

ECHO 2. Creating tables...
%MYSQL_PATH% -u%DB_USER% -p%DB_PASS% %DB_NAME% < "computerlogs_createTables.sql"
IF %ERRORLEVEL% NEQ 0 ( 
    ECHO ERROR: Failed to create tables.
    GOTO :EOF
)

ECHO 3. Populating tables with data...
%MYSQL_PATH% -u%DB_USER% -p%DB_PASS% %DB_NAME% < "computerlogs_populate.sql"
IF %ERRORLEVEL% NEQ 0 ( 
    ECHO ERROR: Failed to populate tables.
    GOTO :EOF
)

ECHO 4. Adding keys and constraints...
%MYSQL_PATH% -u%DB_USER% -p%DB_PASS% %DB_NAME% < "computerlogs_addKeys.sql"
IF %ERRORLEVEL% NEQ 0 ( 
    ECHO ERROR: Failed to add keys and constraints.
    GOTO :EOF
)

ECHO 5. (Optional) Creating triggers...
%MYSQL_PATH% -u%DB_USER% -p%DB_PASS% %DB_NAME% < "computerlogs_createTriggers.sql"
IF %ERRORLEVEL% NEQ 0 ( 
    ECHO ERROR: Failed to create triggers.
    GOTO :EOF
)

ECHO 6. (Optional) Creating procedures...
%MYSQL_PATH% -u%DB_USER% -p%DB_PASS% %DB_NAME% < "computerlogs_createProcedures.sql"
IF %ERRORLEVEL% NEQ 0 ( 
    ECHO ERROR: Failed to create procedures.
    GOTO :EOF
)

ECHO.
ECHO Database setup completed successfully!
:EOF
PAUSE
