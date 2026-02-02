@echo off
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -h 127.0.0.1 -u root -proot -e "DROP DATABASE IF EXISTS sms_2_0; CREATE DATABASE sms_2_0;"
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -h 127.0.0.1 -u root -proot sms_2_0 < %1
if %errorlevel% neq 0 exit /b %errorlevel%
