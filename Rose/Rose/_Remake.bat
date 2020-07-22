Converter\Converter\bin\Release\Converter.exe /R res /S src /W ..\Lia\module.js

makeTags /JS ..\Lia
COPY ..\Lia\tags src

C:\Factory\Tools\PauseEx.exe
