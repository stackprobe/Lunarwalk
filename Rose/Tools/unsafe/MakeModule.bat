IF NOT EXIST src\. GOTO END
IF NOT EXIST _Built.bat GOTO END

C:\Dev\HtmlJS\Lunarwalk\Rose\Converter\Converter\Converter\bin\Release\Converter.exe ^
	/R C:\Dev\HtmlJS\Lunarwalk\Rose\Converter\res ^
	/S src ^
	/WB . ^
	/T C:\Dev\HtmlJS\Lunarwalk\Rose\tags

:END
