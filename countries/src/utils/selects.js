//* VALUES SEARCHBAR

const optionOrder = [
    {value: '', label: 'All Order'},
    {value: 'order=name ASC', label: 'Ascendente'},
    {value: 'order=name DESC', label: 'Descendente'},
    {value: 'order=population DESC', label: 'Major Population'},
    {value: 'order=population ASC', label: 'Menor Population'}
]

const optionFilterContinent = [
    {value: '', label: 'All Continents'},
    {value: 'continent=Europe', label: 'Europe'},
    {value: 'continent=Americas', label: 'Americas'},
    {value: 'continent=Asia', label: 'Asia'},
    {value: 'continent=Africa', label: 'Africa'},
    {value: 'continent=Oceania', label: 'Oceania'}
]

//* VALUES CREATE TOURISM

const optionDifficult = [
    {value: '', label: 'Difficult'},
    {value: 'Baja', label: 'Baja'},
    {value: 'Media-Baja', label: 'Media-Baja'},
    {value: 'Media', label: 'Media'},
    {value: 'Media-Alta', label: 'Media-Alta'},
    {value: 'Alta', label: 'Alta'},
    {value: 'Extrema', label: 'Extrema'}
]

const optionDuration = [
    {value: '', label: 'Duration'},
    {value: '1 hr aprox', label: '1 hr aprox'},
    {value: '2 hrs aprox', label: '2 hrs aprox'},
    {value: '4 hrs aprox', label: '4 hrs aprox'},
    {value: '6 hrs aprox', label: '6 hrs aprox'},
    {value: '8 hrs aprox', label: '8 hrs aprox'},
    {value: '10 hrs aprox' , label: '10 hrs aprox'},
    {value: 'Dias indefinidos', label: 'Dias indefinidos'}
]

const optionSeason = [
    {value: '', label: 'Season'},
    {value: 'Summer', label: 'Summer'},
    {value: 'Autumn', label: 'Autumn'},
    {value: 'Winter', label: 'Winter'},
    {value: 'Spring', label: 'Spring'},
]

export { optionOrder, optionFilterContinent, optionDifficult, optionDuration, optionSeason }