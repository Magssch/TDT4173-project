Cleaned data er datasettet fra Kaggle, med noen modifikasjoner for å filtrere
vekk uønsket data. Det som ble gjort var fjerning av <p> tags, som var på
starten og slutten av hver eneste linje i body. < og > ble også fjernet fra
tags.

Kommandoene i vim som ble kjørt:

:%s/<p>//g
:%s/<\/p>//g
:%s/,>/,/g
:%s/></ /g
:%s/>,/,/g


