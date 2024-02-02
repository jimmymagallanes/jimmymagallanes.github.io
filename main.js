let a = parseFloat(prompt("introduzca su altura en metro"));

let b = parseFloat(prompt("Introduzca su peso en Kg"))

let imc = b/(a*a);

let d='';

if (imc < 16)[

    d= "Infrapesao: Delgadez Severa"
]

else if(16<= imc && imc <=16.99)[
    d='Infrapeso, Delgadez'
]

else if (17<= imc && imc <= 18.494)[
    d='Infrapeso: Delgadez aceptable'
]

else if (18.50 <= imc && imc <= 24.99)[
    d='Peso Normal'
]

else if (25.00 <= imc && imc<=29.99)[
    d='Obeso: Tipo I'
]

else if(35.00 <= imc && imc<= 40.00)[
    d='Obeso: Tipo II'
]

else if (imc > 40.00)[
    d='Obeso: Tipo III'
]
alert("Su resultado fue: "+d); 

