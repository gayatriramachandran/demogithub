@echo off

powershell.exe -ExecutionPolicy RemoteSigned -File uninstall.ps1

set ErrLevel= %ERRORLEVEL%
set /p output= < err.txt
del err.txt

echo %output%

exit /b %ErrLevel%
