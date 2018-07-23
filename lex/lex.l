%{
#define IF 255
%}

delim     [ \t\n]
ws        {delim}+
letter    [A-Za-z]
digit     [0-9]
id        _{letter}({letter}|{digit})*
number    {digit}+(\.{digit}+)?(E[+-]?{digit}+)?

%%

{ws}      { /* no action and no return */}
if        { return (IF); }

%%
