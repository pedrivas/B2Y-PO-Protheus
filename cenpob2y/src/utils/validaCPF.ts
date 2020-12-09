/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */

import { PoDynamicFormValidation } from '@po-ui/ng-components';

/* eslint-disable radix */
export default function testaCPF(strCPF): PoDynamicFormValidation {
  let Soma;
  let Resto;
  let i;
  Soma = 0;
  if (strCPF === '00000000000')
    return {
      value: { ssnHolder: undefined },
      // fields: [
      //   { property: 'city', options: this.getCity(changeValue.value.state) },
      // ],
      focus: 'ssnHolder',
    };

  for (i = 1; i <= 9; i++)
    Soma += parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto !== parseInt(strCPF.substring(9, 10))) return false;

  Soma = 0;
  for (i = 1; i <= 10; i++)
    Soma += parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(strCPF.substring(10, 11))) return false;
  return true;
}
