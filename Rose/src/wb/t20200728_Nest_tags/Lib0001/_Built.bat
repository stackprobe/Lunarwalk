C:\Dev\HtmlJS\Lunarwalk\Rose\Converter\Converter\Converter\bin\Release\Converter.exe ^
	/R C:\Dev\HtmlJS\Lunarwalk\Rose\Converter\res ^
	/S src ^
	/W ..\module.js

C:\Factory\DevTools\makeTags.exe /JS ..

TYPE ..\tags >> C:\Dev\HtmlJS\Lunarwalk\Rose\tags
DEL  ..\tags
